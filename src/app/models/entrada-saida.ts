import { ViaturaDTO } from './viatura.dto';

export interface EntradaSaida {
    id: number,
    tipoEntradaSaida?: number,
    dataEntradaSaida?: Date,
    ativo?: number,
    viaturaDTO: ViaturaDTO;
    unidadePolicialDTO: {
        id: number,
        sigla: string,
    },
}