---
draft: false
slug: /introducao-ao-csharp/jogo-da-forca-v1
tags:
  - Aula 08
  - Introdução ao C#
  - Estruturas de Decisão
  - Estruturas de Repetição
  - Randomização
---

Nesta aplicação, iremos abstrair o sistema de um **Jogo da Forca** passo a passo, seguindo o mesmo paradigma sequencial utilizado no Jogo de Adivinhação. Iremos explorar a geração de números aleatórios, além da manipulação de arrays e loops.

## Requisito 01: Palavra aleatória e input do usuário

Neste primeiro passo, estruturamos a base do jogo.

### O que estamos fazendo?

- Criando uma lista de palavras possíveis
- Sorteando uma palavra aleatória
- Criando uma estrutura para armazenar os acertos do jogador
- Permitindo que o jogador digite letras

### Por que isso é importante?

Antes de pensar em regras de vitória ou derrota, precisamos garantir que:

- Existe uma palavra secreta
- O jogador consegue interagir com o jogo
- O estado do jogo (letras descobertas) é armazenado

Ou seja, aqui estamos construindo o **estado inicial do jogo**.

```cs
string[] palavras = [
    "ABACATE",
    "ABACAXI",
    "ACEROLA",
    "ACAI",
    "ARACA",
    "BACABA",
    "BACURI",
    "BANANA",
    "CAJA",
    "CAJU",
    "CARAMBOLA",
    "CUPUACU",
    "GRAVIOLA",
    "GOIABA",
    "JABUTICABA",
    "JENIPAPO",
    "MACA",
    "MANGABA",
    "MANGA",
    "MARACUJA",
    "MURICI",
    "PEQUI",
    "PITANGA",
    "PITAYA",
    "SAPOTI",
    "TANGERINA",
    "UMBU",
    "UVA",
    "UVAIA"
];

int indiceAleatorio = RandomNumberGenerator.GetInt32(palavras.Length + 1);

string palavraSecreta = palavras[indiceAleatorio];

char[] letrasCorretas = new char[palavraSecreta.Length];

for (int contadorLetras = 0; contadorLetras < palavraSecreta.Length; contadorLetras++)
{
    letrasCorretas[contadorLetras] = '_';
}

while (true)
{
    Console.Clear();
    Console.WriteLine("--------------------------------------------");
    Console.WriteLine("Jogo da Forca");
    Console.WriteLine("--------------------------------------------");
    Console.Write("Chutes: ");

    for (int contadorLetras = 0; contadorLetras < palavraSecreta.Length; contadorLetras++)
    {
        Console.Write(letrasCorretas[contadorLetras]);
    }

    Console.Write("Digite uma letra: ");
    char chute = Convert.ToChar(Console.ReadLine());

    for (int contadorPalavraSecreta = 0; contadorPalavraSecreta < palavraSecreta.Length; contadorPalavraSecreta++)
    {
        char letraSecretaAtual = palavraSecreta[contadorPalavraSecreta];

        if (chute == letraSecretaAtual)
        {
            letrasCorretas[contadorPalavraSecreta] = chute;
        }
    }
}

Console.WriteLine("--------------------------------------------");
Console.Write("Digite ENTER para sair...");
Console.ReadLine();
```

---

## Requisito 02: Condições de vitória e derrota

Agora que o jogo já funciona, vamos torná-lo **completo**.

### Problema da versão anterior

Na versão anterior:

- O jogo nunca terminava
- Não havia vitória nem derrota
- O jogador ficava preso em um loop infinito

### O que foi adicionado?

- Variáveis de controle:
  - `jogadorAcertou`
  - `jogadorPerdeu`
- Contador de erros (`contadorErros`)
- Verificação de vitória (palavra completa)
- Verificação de derrota (limite de erros)

### Por que isso melhora o jogo?

Agora o jogo possui:

- **objetivo claro** (descobrir a palavra)
- **condição de falha** (excesso de erros)
- **feedback ao jogador**

Além disso, introduzimos o conceito de **controle de estado com booleanos**, muito comum em jogos e aplicações reais.

```cs
string[] palavras = [
    "ABACATE",
    "ABACAXI",
    "ACEROLA",
    "ACAI",
    "ARACA",
    "BACABA",
    "BACURI",
    "BANANA",
    "CAJA",
    "CAJU",
    "CARAMBOLA",
    "CUPUACU",
    "GRAVIOLA",
    "GOIABA",
    "JABUTICABA",
    "JENIPAPO",
    "MACA",
    "MANGABA",
    "MANGA",
    "MARACUJA",
    "MURICI",
    "PEQUI",
    "PITANGA",
    "PITAYA",
    "SAPOTI",
    "TANGERINA",
    "UMBU",
    "UVA",
    "UVAIA"
];

int indiceAleatorio = RandomNumberGenerator.GetInt32(palavras.Length + 1);

string palavraSecreta = palavras[indiceAleatorio];

char[] letrasCorretas = new char[palavraSecreta.Length];

for (int contadorLetras = 0; contadorLetras < palavraSecreta.Length; contadorLetras++)
{
    letrasCorretas[contadorLetras] = '_';
}

int contadorErros = 0;

bool jogadorAcertou = false;
bool jogadorPerdeu = false;

while (true)
{
    Console.Clear();
    Console.WriteLine("--------------------------------------------");
    Console.WriteLine("Jogo da Forca");
    Console.WriteLine("--------------------------------------------");
    Console.WriteLine("Erros cometidos: " + contadorErros + " erros");
    Console.Write("Chutes: ");

    for (int contadorLetras = 0; contadorLetras < palavraSecreta.Length; contadorLetras++)
    {
        Console.Write(letrasCorretas[contadorLetras]);
    }

    if (jogadorAcertou)
    {
        Console.WriteLine($"Parabéns, você acertou! A palavra era: {palavraSecreta}");
        break;
    }
    else if (jogadorPerdeu)
    {
        Console.WriteLine($"Que pena, você errou! A palavra era: {palavraSecreta}");
        break;
    }

    Console.Write("Digite uma letra: ");
    char chute = Convert.ToChar(Console.ReadLine());

    bool letraFoiEncontrada = false;

    for (int contadorPalavraSecreta = 0; contadorPalavraSecreta < palavraSecreta.Length; contadorPalavraSecreta++)
    {
        char letraSecretaAtual = palavraSecreta[contadorPalavraSecreta];

        if (chute == letraSecretaAtual)
        {
            letrasCorretas[contadorPalavraSecreta] = chute;
            letraFoiEncontrada = true;
        }
    }

    if (!letraFoiEncontrada)
        contadorErros++;

    string letrasCorretasCompleta = string.Join("", letrasCorretas);

    if (palavraSecreta == letrasCorretasCompleta)
        jogadorAcertou = true;

    if (contadorErros > 5)
        jogadorPerdeu = true;
}

Console.WriteLine("--------------------------------------------");
Console.Write("Digite ENTER para sair...");
Console.ReadLine();
```

---

## Requisito 3: Desenho da forca

Agora vamos melhorar a **experiência visual do jogador**.

### Problema da versão anterior

Mesmo com vitória e derrota:

- O jogador não visualizava o progresso dos erros
- Não havia sensação de evolução durante a partida

### O que foi adicionado?

- Representação visual da forca usando ASCII
- Diferentes estágios baseados no número de erros

### Por que isso é importante?

Esse requisito introduz um conceito muito importante:

👉 **Representação visual baseada em estado**

Ou seja:

- O valor de `contadorErros` controla o que será exibido na tela
- Cada erro altera a "interface" do jogo

Isso é extremamente comum em aplicações reais (UI reativa, dashboards, etc).

Além disso, melhora muito a experiência do usuário, tornando o jogo mais intuitivo.

```cs
string[] palavras = [
    "ABACATE",
    "ABACAXI",
    "ACEROLA",
    "ACAI",
    "ARACA",
    "BACABA",
    "BACURI",
    "BANANA",
    "CAJA",
    "CAJU",
    "CARAMBOLA",
    "CUPUACU",
    "GRAVIOLA",
    "GOIABA",
    "JABUTICABA",
    "JENIPAPO",
    "MACA",
    "MANGABA",
    "MANGA",
    "MARACUJA",
    "MURICI",
    "PEQUI",
    "PITANGA",
    "PITAYA",
    "SAPOTI",
    "TANGERINA",
    "UMBU",
    "UVA",
    "UVAIA"
];

int indiceAleatorio = RandomNumberGenerator.GetInt32(palavras.Length + 1);

string palavraSecreta = palavras[indiceAleatorio];

char[] letrasCorretas = new char[palavraSecreta.Length];

for (int contadorLetras = 0; contadorLetras < palavraSecreta.Length; contadorLetras++)
{
    letrasCorretas[contadorLetras] = '_';
}

int contadorErros = 0;

bool jogadorAcertou = false;
bool jogadorPerdeu = false;

while (true)
{
    Console.Clear();
    Console.WriteLine("--------------------------------------------");
    Console.WriteLine("Jogo da Forca");
    Console.WriteLine("--------------------------------------------");
    Console.WriteLine("Erros cometidos: " + contadorErros + " erros");
    Console.Write("Chutes: ");

    for (int contadorLetras = 0; contadorLetras < palavraSecreta.Length; contadorLetras++)
    {
        Console.Write(letrasCorretas[contadorLetras]);
    }

    Console.WriteLine("\n--------------------------------------------");

    if (contadorErros == 0)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");
    }
    else if (contadorErros == 1)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |         o        ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");

    }
    else if (contadorErros == 2)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |         o        ");
        Console.WriteLine(@" |         |        ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");

    }
    else if (contadorErros == 3)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |         o        ");
        Console.WriteLine(@" |        /|        ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");

    }

    else if (contadorErros == 4)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |         o        ");
        Console.WriteLine(@" |        /|\        ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");

    }

    else if (contadorErros == 5)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |         o        ");
        Console.WriteLine(@" |        /|\       ");
        Console.WriteLine(@" |        / \       ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");
    }

    else if (contadorErros == 6)
    {
        Console.WriteLine(@" ___________        ");
        Console.WriteLine(@" |/        |        ");
        Console.WriteLine(@" |         |        ");
        Console.WriteLine(@" |         o        ");
        Console.WriteLine(@" |        /|\       ");
        Console.WriteLine(@" |        / \       ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@" |                  ");
        Console.WriteLine(@"_|____              ");
    }

    Console.WriteLine("\n--------------------------------------------");

    if (jogadorAcertou)
    {
        Console.WriteLine($"Parabéns, você acertou! A palavra era: {palavraSecreta}");
        break;
    }
    else if (jogadorPerdeu)
    {
        Console.WriteLine($"Que pena, você errou! A palavra era: {palavraSecreta}");
        break;
    }

    Console.Write("Digite uma letra: ");
    char chute = Convert.ToChar(Console.ReadLine());

    bool letraFoiEncontrada = false;

    for (int contadorPalavraSecreta = 0; contadorPalavraSecreta < palavraSecreta.Length; contadorPalavraSecreta++)
    {
        char letraSecretaAtual = palavraSecreta[contadorPalavraSecreta];

        if (chute == letraSecretaAtual)
        {
            letrasCorretas[contadorPalavraSecreta] = chute;
            letraFoiEncontrada = true;
        }
    }

    if (!letraFoiEncontrada)
        contadorErros++;

    string letrasCorretasCompleta = string.Join("", letrasCorretas);

    if (palavraSecreta == letrasCorretasCompleta)
        jogadorAcertou = true;

    if (contadorErros > 5)
        jogadorPerdeu = true;
}

Console.WriteLine("--------------------------------------------");
Console.Write("Digite ENTER para sair...");
Console.ReadLine();
```
