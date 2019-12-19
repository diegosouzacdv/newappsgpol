import { CnhDTO } from './cnh.dto';
import { RecadastramentoDTO } from './recadastramento.dto';
import { TempoServico } from './tempo-servico.dto';

export interface PolicialDTO {
    codigo?: string;
    nome?: string;
    dataNascimento?: string;
    matricula?: string;
    cpf?: string;
    rg?: string;
    posto?: string;
    quadro?: string;
    lotacao?: string;
    lotacaoCodigo?: string;
    lotacaoCodigoSubordinacao?: string;
    nomeGuerra?: string;
    nomePai?: string;
    nomeMae?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    orgaoexpedidorrg?: string;
    telefonefixo?: string;
    celular?: string;
    dataAdmissao?: string;
    tempoServico?: TempoServico
    status?: string;
    situacaoFuncional?: string;
    dataDesligamento?: string;
    cnh?: CnhDTO;
    recadastramento?: RecadastramentoDTO;
    foto?: any;
}