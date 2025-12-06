import sys
import json
import os
from openai import OpenAI

# Inicializa o cliente OpenAI
# A chave de API e o base_url são configurados automaticamente pelo ambiente
client = OpenAI()

def extract_palette_from_image(image_base64):
    """Extrai paleta de cores de uma imagem usando um modelo de visão."""
    try:
        print("🖼️ Starting image palette extraction...", file=sys.stderr)
        
        response = client.chat.completions.create(
            model="gpt-4.1-mini", # Alterado para um modelo mais acessível e disponível
            messages=[
                {
                    "role": "system",
                    "content": "You are a color palette expert. Extract dominant colors from images. Return ONLY a JSON object: {\"palette\": [\"#hex1\", \"#hex2\", ...]}"
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Extract 6-8 dominant and beautiful colors from this image. Return ONLY a JSON object with the palette array."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500
        )
        
        response_text = response.choices[0].message.content.strip()
        print(f"🤖 AI Raw Response: {response_text}", file=sys.stderr)
        
        # Limpa a resposta de possíveis markdown
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        elif response_text.startswith("```"):
            response_text = response_text.replace("```", "").strip()
        
        # Valida se é um JSON válido
        json_response = json.loads(response_text)
        
        # Se não tiver a chave 'palette', tenta criar
        if 'palette' not in json_response:
            if isinstance(json_response, list):
                json_response = {"palette": json_response}
            else:
                raise ValueError("Response doesn't contain 'palette' key")
        
        print(f"✅ Successfully extracted {len(json_response['palette'])} colors", file=sys.stderr)
        return json.dumps(json_response)
        
    except Exception as e:
        error_msg = f"Error in extract_palette_from_image: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        return json.dumps({"error": error_msg})

def generate_palette_from_quiz(quiz_data):
    """Gera paleta de cores baseada nas respostas do quiz usando IA."""
    try:
        # Extrai dados do quiz
        company_name = quiz_data.get('companyName', 'Company')
        business_type = quiz_data.get('businessType', 'modern business')
        style = quiz_data.get('style', 'modern')
        mood = quiz_data.get('mood', 'professional')
        colors_preference = quiz_data.get('colors', 'vibrant')
        
        print(f"🎯 Generating palette for: {company_name}", file=sys.stderr)
        print(f"📋 Quiz data: Type={business_type}, Style={style}, Mood={mood}, Colors={colors_preference}", file=sys.stderr)
        
        # Cria o prompt
        prompt = f"""Create a UNIQUE and professional color palette for this brand:

Company Name: {company_name}
Business Type: {business_type}
Style: {style}
Mood: {mood}
Color Preference: {colors_preference}

IMPORTANT: Generate 6 DIFFERENT, harmonious hex colors that perfectly match this brand's identity.
Be creative and make each palette unique based on the inputs above.

Return ONLY a JSON object in this format:
{{"palette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"]}}

No markdown, no explanations, just the JSON."""
        
        print(f"📤 Sending prompt to OpenAI...", file=sys.stderr)
        
        response = client.chat.completions.create(
            model="gpt-4.1-mini", # Alterado para um modelo mais acessível e disponível
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert color palette designer. You create UNIQUE palettes for each request.

CRITICAL RULES:
1. ALWAYS generate DIFFERENT colors based on the brand's characteristics
2. Return ONLY valid JSON: {"palette": ["#hex1", "#hex2", ...]}
3. No markdown, no explanations
4. Each palette must be unique and creative
5. Colors must be harmonious and professional"""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=500,
            temperature=1.0,  # Máxima criatividade para paletas diferentes
            seed=None # Garante que a resposta não seja determinística
        )
        
        response_text = response.choices[0].message.content.strip()
        print(f"🤖 AI Raw Response: {response_text}", file=sys.stderr)
        
        # Limpa a resposta de possíveis markdown
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        elif response_text.startswith("```"):
            response_text = response_text.replace("```", "").strip()
        
        # Valida se é um JSON válido
        json_response = json.loads(response_text)
        
        # Se não tiver a chave 'palette', tenta criar
        if 'palette' not in json_response:
            if isinstance(json_response, list):
                json_response = {"palette": json_response}
            else:
                raise ValueError("Response doesn't contain 'palette' key")
        
        # Valida se tem cores suficientes
        if not isinstance(json_response['palette'], list) or len(json_response['palette']) < 6:
            raise ValueError(f"Invalid palette: expected 6+ colors, got {len(json_response.get('palette', []))}")
        
        print(f"✅ Successfully generated {len(json_response['palette'])} colors: {json_response['palette']}", file=sys.stderr)
        return json.dumps(json_response)
        
    except Exception as e:
        error_msg = f"Error in generate_palette_from_quiz: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        return json.dumps({"error": error_msg})

def main():
    if len(sys.argv) < 3:
        error = {"error": "Missing arguments: type and data_path"}
        print(json.dumps(error))
        sys.exit(1)

    type_arg = sys.argv[1]
    data_path = sys.argv[2]

    print(f"🚀 Starting AI Helper - Type: {type_arg}", file=sys.stderr)
    print(f"📁 Data path: {data_path}", file=sys.stderr)

    try:
        with open(data_path, 'r') as f:
            data = json.load(f)
        print(f"📦 Loaded data successfully", file=sys.stderr)
    except Exception as e:
        error = {"error": f"Failed to read or parse data file: {str(e)}"}
        print(json.dumps(error))
        sys.exit(1)

    result = None
    if type_arg == 'image_palette':
        image_base64 = data.get('image_base64')
        if not image_base64:
            result = json.dumps({"error": "Missing 'image_base64' in data."})
        else:
            result = extract_palette_from_image(image_base64)
    elif type_arg == 'quiz_palette':
        result = generate_palette_from_quiz(data)
    else:
        result = json.dumps({"error": f"Unknown type: {type_arg}"})

    # Imprime o resultado no stdout
    print(result)
    sys.stdout.flush()
    
    print(f"✅ AI Helper completed successfully", file=sys.stderr)

if __name__ == "__main__":
    main()