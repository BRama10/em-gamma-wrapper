import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib'

import { promises as fsPromises } from 'fs';
import path from 'path';


export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

const formUrl = 'http://localhost:3000/workday_checklist_template.pdf'

  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const form = pdfDoc.getForm()

  const fields = form.getFields();

  fields.forEach(field => {
    const type = field.constructor.name
    const name = field.getName()
    console.log(`${type}: ${name}`)
  })

  

  return NextResponse.json('hu');
}