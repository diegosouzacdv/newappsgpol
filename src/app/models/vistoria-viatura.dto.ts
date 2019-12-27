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
    vistoriaViaturaItensVistoria?: ItensVistoria[];
}