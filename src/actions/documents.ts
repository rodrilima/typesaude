"use server"

import { ErrorsMessages } from "@/config/messages";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreateDocument as CreateResource,
  UpdateDocument as UpdateResource,
  ListReturn,
} from "@/types/actions/documents";
import { Document as Model } from "@prisma/client";
import { getServerSession } from "next-auth";
import { put, del } from "@vercel/blob"
import { createDocumentValidation, updateDocumentValidation } from "@/validations/documents.validation";
import { authOptions } from "@/config/authOptions";
import { revalidatePath } from "next/cache";

const model = prisma.document
const singular = 'documento'
const plural = 'documentos'
const routePath = '/documentos'

export async function create(formData: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const file = formData.get('file') as File
    const path = formData.get('path') || "files"
    const userId = formData.get('userId') ? Number(formData.get('userId')) : undefined
    const consultationId = formData.get('consultationId') ? Number(formData.get('consultationId')) : undefined

    const validation = createDocumentValidation.safeParse({
      file,
      path,
      userId,
      consultationId
    })

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const { url } = await put(`${path}/${file.name}`, file, { access: 'public' });

    const response = await model.create({
      data: {
        type: file.type,
        url,
        userId,
        consultationId
      }
    })
    revalidatePath(routePath)
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao criar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function find(): Promise<ListReturn | ErrorReturn> {
  try {
    const response = await model.findMany({
      orderBy: { 
        id: 'desc' 
      }
    })
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao listar ${plural}. Entre em contato com nosso time.` }
  }
}

export async function update(formData: UpdateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const id = formData.get('id') ? Number(formData.get('id')) : undefined
    const userId = formData.get('userId') ? Number(formData.get('userId')) : undefined
    const consultationId = formData.get('consultationId') ? Number(formData.get('consultationId')) : undefined
    const file = formData.get('file') as File
    const path = formData.get('path') || "files"
    let url;

    const validation = updateDocumentValidation.safeParse({
      id,
      file,
      path,
      userId,
      consultationId
    })

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    if (file) {
      const originalDocument = await model.findUnique({
        where: {
          id
        },
        select: {
          url: true
        }
      })

      if (!originalDocument) {
        return { error: "Documento para atualização não foi encontrado" }
      }

      try {
        await del(originalDocument.url)
      } catch (error) {
        console.error(error)
      }

      const response = await put(`${path}/${file.name}`, file, { access: 'public' });
      url = response.url
    }

    const response = await model.update({
      where: { id },
      data: { type: file.type, url, userId, consultationId }
    })

    revalidatePath(routePath)

    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao atualizar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function remove(id: Model['id']): Promise<void | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    await model.delete({ where: { id } })
    revalidatePath(routePath)
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao remover um ${singular}. Entre em contato com nosso time.` }
  }
}