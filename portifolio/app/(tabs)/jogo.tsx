import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ↓ teclado menor e mais compacto
const KEY_SIZE = Math.floor((width - 44) / 11.5);

// ↓ tamanho da forca mantido praticamente igual
const FORCA_SIZE = Math.min(width * 0.28, 108);

const PALAVRAS = [
  { palavra: 'JAVASCRIPT', dica: 'Linguagem de programação web', dificuldade: 'Fácil' },
  { palavra: 'TYPESCRIPT', dica: 'JavaScript com tipagem estática', dificuldade: 'Médio' },
  { palavra: 'COMPONENTE', dica: 'Bloco de UI reutilizável no React', dificuldade: 'Fácil' },
  { palavra: 'FRAMEWORK', dica: 'Estrutura de desenvolvimento', dificuldade: 'Fácil' },
  { palavra: 'ALGORITMO', dica: 'Sequência de passos para resolver um problema', dificuldade: 'Fácil' },
  { palavra: 'RECURSIVIDADE', dica: 'Função que chama a si mesma', dificuldade: 'Difícil' },
  { palavra: 'POLIMORFISMO', dica: 'Conceito de orientação a objetos', dificuldade: 'Difícil' },
  { palavra: 'REPOSITORIO', dica: 'Onde fica o código no Git', dificuldade: 'Fácil' },
  { palavra: 'COMPILADOR', dica: 'Converte código fonte em executável', dificuldade: 'Médio' },
  { palavra: 'INTERFACE', dica: 'Contrato em programação OO', dificuldade: 'Médio' },
  { palavra: 'BIBLIOTECA', dica: 'Conjunto de funções reutilizáveis', dificuldade: 'Fácil' },
  { palavra: 'VARIAVEL', dica: 'Armazena um valor na memória', dificuldade: 'Fácil' },
  { palavra: 'HERANCA', dica: 'Classe filha herda da classe pai', dificuldade: 'Médio' },
  { palavra: 'PONTEIRO', dica: 'Variável que guarda endereço de memória (C)', dificuldade: 'Médio' },
  { palavra: 'FUNCAO', dica: 'Bloco de código reutilizável', dificuldade: 'Fácil' },
  { palavra: 'VETOR', dica: 'Array unidimensional', dificuldade: 'Fácil' },
  { palavra: 'OBJETO', dica: 'Instância de uma classe', dificuldade: 'Fácil' },
  { palavra: 'CLASSE', dica: 'Molde para criar objetos em OOP', dificuldade: 'Fácil' },
];

const LETRAS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const MAX_ERROS = 6;

function sortear() {
  return PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
}

function ForcaDrawing({ erros }: { erros: number }) {
  const s = FORCA_SIZE;
  const cor = '#4B5563';
  const corB = '#EF4444';

  return (
    <Svg width={s} height={s} viewBox="0 0 160 160">
      <Line x1="10" y1="150" x2="150" y2="150" stroke={cor} strokeWidth={3} strokeLinecap="round" />
      <Line x1="40" y1="150" x2="40" y2="10" stroke={cor} strokeWidth={3} strokeLinecap="round" />
      <Line x1="40" y1="10" x2="110" y2="10" stroke={cor} strokeWidth={3} strokeLinecap="round" />
      <Line x1="110" y1="10" x2="110" y2="30" stroke={cor} strokeWidth={3} strokeLinecap="round" />

      {erros >= 1 && (
        <Circle cx="110" cy="42" r="12" stroke={corB} strokeWidth={2.5} fill="none" />
      )}

      {erros >= 2 && (
        <Line x1="110" y1="54" x2="110" y2="95" stroke={corB} strokeWidth={2.5} strokeLinecap="round" />
      )}

      {erros >= 3 && (
        <Line x1="110" y1="65" x2="88" y2="82" stroke={corB} strokeWidth={2.5} strokeLinecap="round" />
      )}

      {erros >= 4 && (
        <Line x1="110" y1="65" x2="132" y2="82" stroke={corB} strokeWidth={2.5} strokeLinecap="round" />
      )}

      {erros >= 5 && (
        <Line x1="110" y1="95" x2="90" y2="118" stroke={corB} strokeWidth={2.5} strokeLinecap="round" />
      )}

      {erros >= 6 && (
        <Line x1="110" y1="95" x2="130" y2="118" stroke={corB} strokeWidth={2.5} strokeLinecap="round" />
      )}
    </Svg>
  );
}

export default function JogoScreen() {
  const [entrada, setEntrada] = useState(sortear);
  const [erradas, setErradas] = useState<string[]>([]);
  const [corretas, setCorretas] = useState<string[]>([]);
  const [fim, setFim] = useState<'vitoria' | 'derrota' | null>(null);

  const { palavra, dica, dificuldade } = entrada;

  const erros = erradas.length;

  const ganhou = palavra.split('').every((l) => corretas.includes(l));
  const perdeu = erros >= MAX_ERROS;
  const gameOver = ganhou || perdeu;

  const chutar = useCallback(
    (letra: string) => {
      if (gameOver || corretas.includes(letra) || erradas.includes(letra)) return;

      if (palavra.includes(letra)) {
        const nc = [...corretas, letra];
        setCorretas(nc);

        if (palavra.split('').every((l) => nc.includes(l))) {
          setFim('vitoria');
        }
      } else {
        const ne = [...erradas, letra];
        setErradas(ne);

        if (ne.length >= MAX_ERROS) {
          setFim('derrota');
        }
      }
    },
    [corretas, erradas, palavra, gameOver]
  );

  const reiniciar = () => {
    setEntrada(sortear());
    setErradas([]);
    setCorretas([]);
    setFim(null);
  };

  const difColor =
    dificuldade === 'Fácil'
      ? '#10B981'
      : dificuldade === 'Médio'
      ? '#F59E0B'
      : '#EF4444';

  return (
    <SafeAreaView style={styles.safe}>
      {/* ↓ Scroll habilitado como garantia */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.titulo}>Jogo da Forca</Text>

              <View
                style={[
                  styles.difBadge,
                  { backgroundColor: difColor + '22' },
                ]}
              >
                <Text style={[styles.difText, { color: difColor }]}>
                  {dificuldade}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={reiniciar} style={styles.reiniciarBtn}>
              <Ionicons name="refresh" size={15} color="#A78BFA" />
              <Text style={styles.reiniciarText}>Nova</Text>
            </TouchableOpacity>
          </View>

          {/* Dica */}
          <View style={styles.dicaBox}>
            <Ionicons name="bulb-outline" size={12} color="#F59E0B" />

            <Text style={styles.dicaText} numberOfLines={1}>
              {dica}
            </Text>

            <Text style={styles.tentativas}>
              {MAX_ERROS - erros} erro
              {MAX_ERROS - erros !== 1 ? 's' : ''} restam
            </Text>
          </View>

          {/* Área central */}
          <View style={styles.gameArea}>
            {/* Forca */}
            <View style={styles.forcaCol}>
              <ForcaDrawing erros={erros} />

              <View style={styles.vidaBar}>
                {Array.from({ length: MAX_ERROS }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.vidaSeg,
                      i < erros ? styles.vidaErro : styles.vidaOk,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Palavra */}
            <View style={styles.palavraCol}>
              <View style={styles.letrasRow}>
                {palavra.split('').map((letra, i) => (
                  <View key={i} style={styles.letraBox}>
                    <Text
                      style={[
                        styles.letraTexto,
                        fim === 'derrota' &&
                          !corretas.includes(letra) &&
                          styles.letraErroFim,
                      ]}
                    >
                      {corretas.includes(letra) || fim === 'derrota'
                        ? letra
                        : ' '}
                    </Text>

                    <View
                      style={[
                        styles.letraLinha,
                        corretas.includes(letra) &&
                          styles.letraLinhaOk,
                        fim === 'derrota' &&
                          !corretas.includes(letra) &&
                          styles.letraLinhaErro,
                      ]}
                    />
                  </View>
                ))}
              </View>

              {erradas.length > 0 && (
                <View style={styles.erradasBox}>
                  <Text style={styles.erradasLabel}>Erradas: </Text>

                  <Text style={styles.erradasLetras}>
                    {erradas.join(' ')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Teclado */}
          {!gameOver ? (
            <View style={styles.teclado}>
              {LETRAS.map((linha, li) => (
                <View key={li} style={styles.tecladoLinha}>
                  {linha.map((letra) => {
                    const ok = corretas.includes(letra);
                    const err = erradas.includes(letra);

                    return (
                      <TouchableOpacity
                        key={letra}
                        style={[
                          styles.tecla,
                          ok && styles.teclaOk,
                          err && styles.teclaErr,
                        ]}
                        onPress={() => chutar(letra)}
                        disabled={ok || err}
                        activeOpacity={0.6}
                      >
                        <Text
                          style={[
                            styles.teclaTexto,
                            ok && styles.teclaTextoOk,
                            err && styles.teclaTextoErr,
                          ]}
                        >
                          {letra}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          ) : (
            <View
              style={[
                styles.resultado,
                fim === 'vitoria'
                  ? styles.resultV
                  : styles.resultD,
              ]}
            >
              <Text style={styles.resultEmoji}>
                {fim === 'vitoria' ? '🎉' : '💀'}
              </Text>

              <Text style={styles.resultTitulo}>
                {fim === 'vitoria'
                  ? 'Você ganhou!'
                  : `Palavra: ${palavra}`}
              </Text>

              <TouchableOpacity
                style={styles.novaBt}
                onPress={reiniciar}
              >
                <Ionicons name="refresh" size={15} color="#fff" />

                <Text style={styles.novaBtText}>
                  Jogar novamente
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F0F14',
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  titulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F9FAFB',
  },

  difBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },

  difText: {
    fontSize: 10,
    fontWeight: '700',
  },

  reiniciarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E1E2A',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D2D3E',
  },

  reiniciarText: {
    color: '#A78BFA',
    fontSize: 11,
  },

  dicaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F59E0B0D',
    borderWidth: 1,
    borderColor: '#F59E0B1A',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginBottom: 6,
  },

  dicaText: {
    fontSize: 11,
    color: '#FCD34D',
    flex: 1,
  },

  tentativas: {
    fontSize: 10,
    color: '#6B7280',
    flexShrink: 0,
  },

  gameArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  forcaCol: {
    alignItems: 'center',
    gap: 5,
  },

  vidaBar: {
    flexDirection: 'row',
    gap: 3,
  },

  vidaSeg: {
    width: 12,
    height: 4,
    borderRadius: 2,
  },

  vidaOk: {
    backgroundColor: '#10B981',
  },

  vidaErro: {
    backgroundColor: '#EF4444',
  },

  palavraCol: {
    flex: 1,
  },

  letrasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 6,
  },

  letraBox: {
    alignItems: 'center',
    width: 17,
  },

  letraTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
    lineHeight: 20,
  },

  letraErroFim: {
    color: '#EF4444',
  },

  letraLinha: {
    width: 17,
    height: 2,
    backgroundColor: '#3D3D5E',
    borderRadius: 1,
    marginTop: 1,
  },

  letraLinhaOk: {
    backgroundColor: '#7C3AED',
  },

  letraLinhaErro: {
    backgroundColor: '#EF4444',
  },

  erradasBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  erradasLabel: {
    fontSize: 10,
    color: '#6B7280',
  },

  erradasLetras: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  // ↓ teclado otimizado
  teclado: {
    gap: 3,
    paddingBottom: 8,
  },

  tecladoLinha: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },

  tecla: {
    width: KEY_SIZE,
    height: KEY_SIZE - 1,
    borderRadius: 6,
    backgroundColor: '#1E1E2A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2D2D3E',
  },

  teclaOk: {
    backgroundColor: '#10B98133',
    borderColor: '#10B981',
  },

  teclaErr: {
    backgroundColor: '#EF444415',
    borderColor: '#EF444430',
  },

  teclaTexto: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D1D5DB',
  },

  teclaTextoOk: {
    color: '#34D399',
  },

  teclaTextoErr: {
    color: '#EF444450',
  },

  resultado: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 8,
    padding: 16,
    marginTop: 6,
  },

  resultV: {
    backgroundColor: '#10B98111',
    borderColor: '#10B98133',
  },

  resultD: {
    backgroundColor: '#EF444411',
    borderColor: '#EF444433',
  },

  resultEmoji: {
    fontSize: 32,
  },

  resultTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
    textAlign: 'center',
  },

  novaBt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    marginTop: 4,
  },

  novaBtText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});