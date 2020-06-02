export interface DadosResumoPolicial {
    codigo?: number;
    cnh?: {
        categoria?: string;
        cnhRegistro?: string;
        dataEmissao?: string;
        dataPrimeira?: string;
        dataValidade?: string;
    }
    dataAdmissao?: string;
    enderecoAtual?: string;
    listEmail?: string;
    listTelefone?: string;
    lotacao?: string;
    lotacaoCodigo?: number;
    lotacaoCodigoSubordinacao?: number;
    matricula?: string;
    nome?: string;
    nomeGuerra?: string;
    porteSuspenso?: boolean;
    posto?: string;
    quadro?: string;
    situacaoFuncional?: string;
}