// import qs from "querystring";
// import { authClient } from "../../server";
import { GET_ONE } from 'react-admin';

export const facilityTypes = {
  GET_FACILITY: 'GET_FACILITY',
};
// export const facilityActions = {
//   getFacility(facilityId) {
//     return async dispatch => {
//       const response = await authClient.get(`/users/${qs.stringify({id_like: facilityId})}`);
//       console.log({response});

//       dispatch({
//         type: facilityTypes.GET_FACILITY,
//         payload: response.data
//       });
//     };
//   }
// };

export const facilityActions = {
  getFacility(facilityId) {
    return {
      type: facilityTypes.GET_FACILITY,
      payload: { id: facilityId },
      meta: {
        resource: 'users',
        fetch: GET_ONE,
        //  onSuccess: {
        //      notification: {
        //          body: 'Success',
        //          level: 'info',
        //      },
        //     //  callback: ({ payload, requestPayload }) => { console.log({payload, requestPayload});
        //       // }
        //     //  redirectTo: '/comments',
        //     //  basePath,
        //  },
        onFailure: {
          notification: {
            body: 'Failed',
            level: 'warning',
          },
        },
      },
    };
  },
};
