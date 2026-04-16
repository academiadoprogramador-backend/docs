---
draft: true
slug: /introducao-ao-csharp/jogo-dados-v2
tags:
  - Aula 13
  - Introdução ao C#
  - Estruturas de Repetição
  - Estruturas de Decisão
  - Random
---

---

## Requisito 1: Rodada do Jogador

Antes:

```cs
while (true)
{
    Console.Clear();
    Console.WriteLine("--------------------------------------");
    Console.WriteLine("Jogo dos Dados");
    Console.WriteLine("--------------------------------------");
    Console.WriteLine("Rodada do Jogador");
    Console.WriteLine("--------------------------------------");

    Console.Write("Pressione ENTER para lançar um dado...");
    Console.ReadLine();

    int resultadoJogador = RandomNumberGenerator.GetInt32(1, 7);

    posicaoJogador += resultadoJogador;

    Console.WriteLine("--------------------------------------");
    Console.WriteLine("O número sorteado foi: " + resultadoJogador);
    Console.WriteLine("--------------------------------------");

    Console.WriteLine($"Você está na posição: {posicaoJogador} de {limiteLinhaChegada}.");

    if (posicaoJogador == 5 || posicaoJogador == 10 || posicaoJogador == 15 || posicaoJogador == 25)
    {
        Console.WriteLine($"\nEvento: Avanço de {bonusAvancoExtra} casas!");

        posicaoJogador += bonusAvancoExtra;

        Console.WriteLine($"\nVocê está na posição: {posicaoJogador} de {limiteLinhaChegada}.");
    }

    else if (posicaoJogador == 7 || posicaoJogador == 13 || posicaoJogador == 20)
    {
        Console.WriteLine($"\nEvento: Recuo de {penalidadeRecuo} casas!");

        posicaoJogador -= penalidadeRecuo;

        Console.WriteLine($"\nVocê está na posição: {posicaoJogador} de {limiteLinhaChegada}.");
    }
}
```

Depois:

```cs
 static int ExecutarRodadaDoJogador
(
    int posicaoJogador,
    int limiteLinhaChegada,
    int bonusAvancoExtra,
    int penalidadeRecuo
)
{
    Console.Clear();
    Console.WriteLine("--------------------------------------");
    Console.WriteLine("Jogo dos Dados");
    Console.WriteLine("--------------------------------------");
    Console.WriteLine("Rodada do Jogador");
    Console.WriteLine("--------------------------------------");

    Console.Write("Pressione ENTER para lançar um dado...");
    Console.ReadLine();

    int resultadoJogador = RandomNumberGenerator.GetInt32(1, 7);

    posicaoJogador += resultadoJogador;

    Console.WriteLine("--------------------------------------");
    Console.WriteLine("O número sorteado foi: " + resultadoJogador);
    Console.WriteLine("--------------------------------------");

    Console.WriteLine($"Você está na posição: {posicaoJogador} de {limiteLinhaChegada}.");

    if (posicaoJogador == 5 || posicaoJogador == 10 || posicaoJogador == 15 || posicaoJogador == 25)
    {
        Console.WriteLine($"\nEvento: Avanço de {bonusAvancoExtra} casas!");

        posicaoJogador += bonusAvancoExtra;

        Console.WriteLine($"\nVocê está na posição: {posicaoJogador} de {limiteLinhaChegada}.");
    }

    else if (posicaoJogador == 7 || posicaoJogador == 13 || posicaoJogador == 20)
    {
        Console.WriteLine($"\nEvento: Recuo de {penalidadeRecuo} casas!");

        posicaoJogador -= penalidadeRecuo;

        Console.WriteLine($"\nVocê está na posição: {posicaoJogador} de {limiteLinhaChegada}.");
    }

    return posicaoJogador;
}

```

```cs
int posicaoJogador = 0;

while (true)
{
    // 1. Rodada do Jogador
    posicaoJogador = ExecutarRodadaDoJogador(
        posicaoJogador,
        limiteLinhaChegada,
        bonusAvancoExtra,
        penalidadeRecuo
    );

    // 2. Check de vitória do Jogador
}
```

## Requisito 2: Rodada do Computador

Antes:

```cs

```

Depois:

```cs

```
