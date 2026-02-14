import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Nenhuma imagem fornecida' },
        { status: 400 }
      );
    }

    // Converter para blob
    const imageBlob = await imageFile.arrayBuffer();

    // Chamar API do Remove.bg
    const removeBgFormData = new FormData();
    removeBgFormData.append('image_file', new Blob([imageBlob]), imageFile.name);
    removeBgFormData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVE_BG_API_KEY || '',
      },
      body: removeBgFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro Remove.bg:', errorData);
      
      // Verificar se é erro de API key
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'API key inválida ou expirada' },
          { status: 403 }
        );
      }
      
      // Verificar se excedeu limite
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'Limite de créditos excedido' },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: 'Erro ao processar imagem' },
        { status: response.status }
      );
    }

    // Retornar imagem processada
    const resultBlob = await response.blob();
    
    return new NextResponse(resultBlob, {
      headers: {
        'Content-Type': 'image/png',
      },
    });

  } catch (error) {
    console.error('Erro no processamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
