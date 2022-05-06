import { axios } from '@/service/axios/configuration';
import { errorHandling } from '@/helpers/errorHandling';

export type CornerFlags = {
  priority: number,
  messageType: number,
  borderColour: string,
  value: string,
  background: string,
  plpColour: string,
  pdpColour: string,
  fontWeight: string,
  cornerFlagRules: [{
    compareProperty: string,
    compareValue: string,
    comparisonType: string
  }]
}

export const getCornerFlags = () =>
  axios.get<CornerFlags[] | Error>('/webstore/loadCornerFlag.sdo')
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(errorHandling(error.response.status));
    });
