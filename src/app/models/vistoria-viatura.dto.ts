import { ItensVistoria } from './itens-vistoria';

export interface VistoriaVistoriaDTO {
    id?: number,
    odometro?: number,
    dataVistoria?: string,
    dataLiberacao?: string,
    nivelCombustivel?: string,
    ativo?: boolean,
    observacaoMotorista?: string,
    observacaoValidado?: string,
    observacaoMotoristaFinal?: string,
    observacaoValidadoFinal?: string,
    vistoriaViaturaItensVistoria?: ItensVistoria[];
    longitude?: number;
    latitude?: number;
}