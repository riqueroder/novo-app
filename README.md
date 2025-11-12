## 🧠 IA Maintenance Command — TattooAR

> ⚙️ **Objetivo Geral:**  
Corrigir o erro  
`The sandbox is running but there's no service running on port 3000.`  
e restaurar o funcionamento correto do app **TattooAR**, removendo qualquer código de câmera ou AR que possa estar impedindo a inicialização do servidor na Vercel.

---

### 🧩 INSTRUÇÕES PARA A IA:

1. **Remover completamente o código de câmera e AR:**
   - Exclua todas as funções e chamadas relacionadas à câmera, como:
     ```js
     startCamera, stopCamera, openCamera, closeCamera, initCamera
     ```
   - Remova trechos que usam:
     ```js
     navigator.mediaDevices.getUserMedia
     videoRef, srcObject, useRef
     ```
   - Exclua todos os componentes e arquivos relacionados, incluindo:
     - `CameraAR.jsx`
     - `CameraView.jsx`
     - `ARCamera.js`
     - Qualquer outro componente que utilize câmera ou projeção AR.

2. **Remover botões e elementos de UI da câmera:**
   - Exclua botões como:
     ```
     📷 Abrir Câmera
     ❌ Fechar Câmera
     Ver Design
     ```
   - Remova textos e ícones relacionados a abrir, fechar ou acessar câmera.

3. **Limpar imports e dependências:**
   - Remova qualquer `import` que traga componentes ou hooks de câmera.
   - Exclua dependências de AR/câmera no `package.json` se existirem.
   - Mantenha apenas as dependências essenciais do projeto.

4. **Revisar o `package.json`:**
   - Mantenha apenas os scripts principais:
     ```json
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start"
     }
     ```
   - Remova scripts que mencionem AR, camera ou sandbox.

5. **Verificar inicialização do servidor:**
   - Certifique-se de que o app roda corretamente na Vercel com:
     ```
     npm run build && npm start
     ```
   - O serviço principal deve rodar na **porta 3000**, sem bloqueios ou scripts pendurados.

6. **Preservar o restante do app:**
   - Mantenha intactas as abas e conteúdos:
     - **Tecnologia AR** (somente textos e layout — sem ativar câmera)
     - **Galeria** (com as imagens que foram substituídas anteriormente)
     - **Upload de Foto** (mantendo o design, mas sem funcionalidade de câmera)
   - Não alterar o design minimalista preto e branco do site.

7. **Executar commit automático:**
chore: remove all camera and AR code to fix sandbox error on port 3000

8. **Verificar sucesso da correção:**
- Após aplicar este comando, o projeto deve:
  - Iniciar sem erros.
  - Mostrar corretamente todas as seções.
  - Não exibir tela de câmera.
  - Não travar nem exibir o erro de porta 3000.

---

### ✅ RESULTADO ESPERADO:

- O app **TattooAR** volta a funcionar normalmente no ambiente da Vercel.  
- Nenhum código de câmera ou AR ativo permanece.  
- O servidor responde corretamente na **porta 3000**.  
- Todo o design minimalista e moderno do site é mantido.

---

### 💬 DICA:

Adicione esta seção ao final do `README.md` para que a IA de automação reconheça este comando sempre que o repositório for sincronizado com o GitHub ou implantado na Vercel.

---

### 📦 TÍTULO DA SEÇÃO:
🧠 IA Maintenance Command — TattooAR (Safe Mode)

---

### 🧩 OPCIONAL — RESTAURAÇÃO FUTURA:
Caso queira futuramente restaurar a função de câmera, crie um novo prompt com:
restore: enable AR camera access with rear camera and live 3D projection
Esse comando pedirá à IA para recriar a funcionalidade de câmera e projeção em 3D.

---

✦ **Fim do comando IA — TattooAR (Safe Mode)** ✦
