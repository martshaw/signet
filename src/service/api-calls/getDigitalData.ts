import { axios } from '@/service/axios/configuration';
import { errorHandling } from '@/helpers/errorHandling';

export const getDigitalData = async (url: string) =>
  axios.get<DigitalData|Error>('/webstore/getDigitalData/', {
    params: {
      url: `/webstore/l/${url}`
    }
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error((errorHandling(error.response.status)));
    });
