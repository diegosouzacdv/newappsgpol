import { ViaturaTemVistoriaDTO } from './viatura-tem-vistoria.dto';

export interface ViaturaDTO {
    id: string;
    odometro?:string;
    odometroProximaRevisao?:string;
    placa: string;
    prefixo: string;
    marca: string;
    modelo: string;
    status: string;
    ufPlaca: string;
    placaVinculada?: string;
    chassi: string;
    tombamento: string;
    renavam: string;
    anoFabricacao: string;
    anoModelo: string;
    dataInclusao: string;
    dataProximaRevisao: string;
    dataFormatadaProximaRevisao: number;
    tipoCombustivel: string;
    tipoViatura: string;
    lotacao: string;
    lotacaoCodigo: string;
    lotacaoCodigoSubordinacao: string;
    lotacaoSubordinacao: string;
    marcaSigla: string;
    motorista?:string;
    viaturaTemVistoria?: ViaturaTemVistoriaDTO;
}

