import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';


export const reloadProductEpic = action$ =>
  action$.ofType('LOAD_ERROR')
  .filter(action => (action.payload.xhr != null))
  .filter(action => (action.payload.xhr.response != null))
  .filter(rr => (rr.payload.xhr.response.error_description === 'The access token provided has expired.'))
  .flatMap(() =>
                Observable.concat(
                  Observable.of(
                    { type: 'START_REFRESH' },
                   ),
                    ajax({ url: 'https://www.sublation.nl//web/app_dev.php/users/refresh', headers: { credentials: 'include' } })
                      .flatMap(json =>
                            Observable.concat(

                                  Observable.of(
                                    { type: 'FINISH_REFRESH' },
                                  ),
                                  Observable.of(
                                    { type: 'GET_TOKEN',
                                      json: json.response },
                                  ),

                                  Observable.of(
                                    { type: 'REPEAT_LAST_ACTION' },
                                  ),
                            ),
                        ),
                ),
  );

export const retryLastActionEpic = (action$, store) =>
  action$.ofType('REPEAT_LAST_ACTION')

  .flatMap(() =>
                Observable.concat(
                  Observable.of(
                    store.getState().connection.lastaction.action,
                  ),

                ),
  );


export const singleProductEpic = (action$ =>
  action$.ofType('GETPRODUCT')

  .flatMap(action =>
Observable.concat(
  Observable.of({
    type: 'CANCEL', // Ajax calls cancel each other out, this has no real function at the moment, testing capabilities of observables
  }),
     Observable.of({
       type: 'LOADING',

     }),
   ajax({ url: `https://www.sublation.nl//web/app_dev.php/products/single?ProductId=${action.id}`, headers: { Authorization: `Bearer ${action.token}`, 'Content-Type': 'application/json' } })
   .flatMap(json =>
     Observable.concat(
       // Fire 2 actions, one after the other
       Observable.of({
         type: 'HANDLEPRODUCT',
         json: json.response,
       }),
          Observable.of({
            type: 'LOAD_COMPLETE' },
          ),
        ),
     )
  .race(
          action$.ofType('CANCEL')
            .map(() => canceled())
            .take(1),
        )
  .catch(error => Observable.of({
    type: 'LOAD_ERROR',
    payload: error,
    error: true },
  ),
),
  )));
export const getLocationsEpic = ((action$, store) =>
    action$.ofType('GET_LOCATIONS')

    .flatMap(action =>
  Observable.concat(
    Observable.of({
      type: 'LAST_ACTION',
      action,
    }),
       Observable.of({
         type: 'LOADING',

       }),
     ajax({ url: 'https://www.sublation.nl//web/app_dev.php/locations/single', headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
     .flatMap(json =>
       Observable.concat(
         // Fire 2 actions, one after the other
         Observable.of({
           type: 'HANDLE_LOCATIONS',
           json: json.response,
         }),
            Observable.of({
              type: 'LOAD_COMPLETE' },
            ),
          ),
       )
    .race(
            action$.ofType('CANCEL')
              .map(() => canceled())
              .take(1),
          )
    .catch(error => Observable.of({
      type: 'LOAD_ERROR',
      payload: error,
      error: true },
    ),
  ),
    )));
export const deleteLocationEpic = (action$, store) =>
        action$.ofType('DELETE_LOCATION')

        .flatMap(action =>
      Observable.concat(
        Observable.of({
          type: 'CANCEL',
        }),
           Observable.of({
             type: 'LAST_ACTION',
             action,
           }),
           Observable.of({
             type: 'LOADING',
           }),
         ajax({ url: `https://www.sublation.nl//web/app_dev.php/locations/locationdelete?locationId=${action.id}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
         .flatMap(json =>
           Observable.concat(
             Observable.of({
               type: 'CLOSE_MODAL_LOCATION',
             }),
             Observable.of({
               type: 'LOAD_COMPLETE',
             }),
             Observable.of({
               type: 'HANDLE_DELETE_LOCATION',
               json: json.response,
             }),
           ),
           )
           .catch(error => Observable.of({
             type: 'LOAD_ERROR',
             payload: error,
             error: true,
           })),
        ));
export const allProductsEpic = (action$, store) =>
    action$.ofType('GET_ALL_PRODUCTS')

    .flatMap(action =>
      Observable.concat(
        Observable.of({
          type: 'LAST_ACTION',
          action,
        }),
       Observable.of({
         type: 'LOADING',
       }),
     ajax({ url: 'https://www.sublation.nl//web/app_dev.php/products/getall', headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
     .flatMap(json =>
       Observable.concat(
         Observable.of({
           type: 'HANDLE_GET_PRODUCTS',
           json: json.response,
         }),
         Observable.of({
           type: 'LOAD_COMPLETE',
         }),
       ),
     )
    .race(
            action$.ofType('CANCEL')
              .map(() => canceled())
              .take(1),
          )
    .catch(error => Observable.of({
      type: 'LOAD_ERROR',
      payload: error,
      error: true,
    })),
  ));
export const initializeEpic = (action$, store) =>
      action$.ofType('INITIALIZE')

      .flatMap(action =>
        Observable.concat(
          Observable.of({
            type: 'LAST_ACTION',
            action,
          }),
         Observable.of({
           type: 'LOADING',
         }),
       ajax({ url: 'https://www.sublation.nl//web/app_dev.php/users/initialize', headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
       .flatMap(json =>
         Observable.concat(
           Observable.of({
             type: 'HANDLE_GET_PRODUCTS',
             json: json.response.products,
           }),
           Observable.of({
             type: 'HANDLE_USER',
             json: json.response,
           }),
           Observable.of({
             type: 'HANDLE_LOCATIONS',
             json: json.response,
           }),
           Observable.of({
             type: 'HANDLE_PRODUCTTYPES',
             json: json.response,
           }),
           Observable.of({
             type: 'LOAD_COMPLETE',
           }),
         ),
       )
      .race(
              action$.ofType('CANCEL')
                .map(() => canceled())
                .take(1),
            )
      .catch(error => Observable.of({
        type: 'LOAD_ERROR',
        payload: error,
        error: true,
      })),
    ));
export const initializepublicEpic = (action$) =>
          action$.ofType('INITIALIZE_PUBLIC')

          .flatMap(action =>
            Observable.concat(
              Observable.of({
                type: 'LAST_ACTION',
                action,
              }),
             Observable.of({
               type: 'LOADING',
             }),
           ajax({ url: 'https://www.sublation.nl//web/app_dev.php/users/initializepublic?lat=53.3434&lng=5.4234', headers: { 'Content-Type': 'application/json' } })
           .flatMap(json =>
             Observable.concat(
               Observable.of({
                 type: 'HANDLE_GET_PRODUCTS_PUBLIC',
                 json: json.response.products,
               }),
               Observable.of({
                 type: 'HANDLE_LOCATIONS_PUBLIC',
                 json: json.response,
               }),
               Observable.of({
                 type: 'HANDLE_PRODUCTTYPES',
                 json: json.response,
               }),
               Observable.of({
                 type: 'LOAD_COMPLETE',
               }),
               Observable.of({
                 type: 'REDRAW_MARKERS',
                 value: true,
               }),
             ),
           )
          .race(
                  action$.ofType('CANCEL')
                    .map(() => canceled())
                    .take(1),
                )
          .catch(error => Observable.of({
            type: 'LOAD_ERROR',
            payload: error,
            error: true,
          })),
        ));
export const allProductsPublicEpic = (action$) =>
      action$.ofType('GET_ALL_PRODUCTS_PUBLIC')

      .flatMap(action =>
        Observable.concat(
           Observable.of({
             type: 'LOADING',
           }),
       ajax({ url: `https://www.sublation.nl//web/app_dev.php/products/getallpublic?lat=${action.lat}&&lng=${action.lng}`, headers: { 'Content-Type': 'application/json' } })
       .flatMap(json =>
         Observable.concat(
           Observable.of({
             type: 'HANDLE_GET_PRODUCTS_PUBLIC',
             json: json.response,
           }),
           Observable.of({
             type: 'LOAD_COMPLETE',
           }),
         ),
       )
      .race(
              action$.ofType('CANCEL')
                .map(() => canceled())
                .take(1),
            )
      .catch(error => Observable.of({
        type: 'LOAD_ERROR',
        payload: error,
        error: true,
      })),
    ));
export const deleteProductEpic = (action$, store) =>
    action$.ofType('DELETEPRODUCT')

    .flatMap(action =>
  Observable.concat(
    Observable.of({
      type: 'CANCEL',
    }),
       Observable.of({
         type: 'LAST_ACTION',
         action,
       }),
       Observable.of({
         type: 'LOADING',
       }),
     ajax({ url: `https://www.sublation.nl//web/app_dev.php/products/productdelete?productId=${action.id}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
     .flatMap(json =>
       Observable.concat(
         Observable.of({
           type: 'CLOSE_MODAL',
         }),
         Observable.of({
           type: 'LOAD_COMPLETE',
         }),
         Observable.of({
           type: 'HANDLE_DELETE_PRODUCT',
           json: json.response,
         }),
       ),
       )
       .catch(error => Observable.of({
         type: 'LOAD_ERROR',
         payload: error,
         error: true,
       })),
    ));
export const newProductEpic = (action$, store) =>
  action$.ofType('NEWPRODUCT')
  .flatMap(action =>
    Observable.concat(
      Observable.of({
        type: 'CANCEL',
      }),
      Observable.of({
        type: 'LAST_ACTION',
        action,
      }),
      Observable.of({
        type: 'LOADING',
      }),
      ajax({ url: `https://www.sublation.nl//web/app_dev.php/products/new?ProductName=${action.name}&&description=${action.description}&${action.groups}${action.locations}&Producttype=${action.ptype}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
       .flatMap(json =>
         Observable.concat(
           Observable.of({
             type: 'HANDLENEWPRODUCT',
             json: json.response,
           }),
           Observable.of({
             type: 'LOAD_COMPLETE',
           }),
           Observable.of({
             type: 'CLOSE_MODALNP',
           })),
         )
      .race(
              action$.ofType('CANCEL')
                .map(() => canceled())
                .take(1),
              )
      .catch(error => Observable.of({
        type: 'LOAD_ERROR',
        payload: error,
        error: true,
      })),
    ));
export const newLocationEpic = (action$, store) =>
      action$.ofType('NEW_LOCATION')
      .flatMap(action =>
        Observable.concat(
          Observable.of({
            type: 'CANCEL',
          }),
          Observable.of({
            type: 'LAST_ACTION',
            action,
          }),
          Observable.of({
            type: 'LOADING',
          }),
          ajax({ url: `https://www.sublation.nl//web/app_dev.php/locations/new?LocationName=${action.name}&&description=${action.description}&&type=${action.ltype}&&address=${action.address}&&lat=${action.lat}&&lng=${action.lng}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
           .flatMap(json =>
             Observable.concat(
               Observable.of({
                 type: 'HANDLE_NEW_LOCATION',
                 json: json.response,
               }),
               Observable.of({
                 type: 'LOAD_COMPLETE',
               }),
               Observable.of({
                 type: 'CLOSE_NEW_LOCATION_MODAL',
               }),
               Observable.of({
                 type: 'CLOSE_NEW_SUBLOCATION_MODAL',
               })),
             )
          .race(
                  action$.ofType('CANCEL')
                    .map(() => canceled())
                    .take(1),
                  )
          .catch(error => Observable.of({
            type: 'LOAD_ERROR',
            payload: error,
            error: true,
          })),
        ));
export const editLocationEpic = (action$, store) =>
              action$.ofType('EDIT_LOCATION')
              .flatMap(action =>
                Observable.concat(
                  Observable.of({
                    type: 'CANCEL',
                  }),
                  Observable.of({
                    type: 'LAST_ACTION',
                    action,
                  }),
                  Observable.of({
                    type: 'LOADING',
                  }),
                  ajax({ url: `https://www.sublation.nl//web/app_dev.php/locations/edit?LocationName=${action.name}&&description=${action.description}&&id=${action.id}&&address=${action.address}&&lat=${action.lat}&&lng=${action.lng}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
                   .flatMap(json =>
                     Observable.concat(
                       Observable.of({
                         type: 'HANDLE_EDIT_LOCATION',
                         json: json.response,
                       }),
                       Observable.of({
                         type: 'LOAD_COMPLETE',
                       }),
                       Observable.of({
                         type: 'CLOSE_MODAL_LOCATION',
                       })),
                     )
                  .race(
                          action$.ofType('CANCEL')
                            .map(() => canceled())
                            .take(1),
                          )
                  .catch(error => Observable.of({
                    type: 'LOAD_ERROR',
                    payload: error,
                    error: true,
                  })),
                ));
export const editProductEpic = (action$, store) =>
        action$.ofType('EDITPRODUCT')
          .flatMap(action =>
            Observable.concat(
              Observable.of({
                type: 'CANCEL',
              }),
              Observable.of({
                type: 'LAST_ACTION',
                action,
              }),
              Observable.of({
                type: 'LOADING',
              }),
         ajax({ url: `https://www.sublation.nl//web/app_dev.php/products/editproduct?ProductId=${action.id}&&ProductName=${action.name}&&ProductDescription=${action.description}&&${action.groups}${action.locations}&ptype=${action.ptype}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
         .flatMap(json =>
           Observable.concat(
             Observable.of({
               type: 'LOAD_COMPLETE',
             }),
             Observable.of({
               type: 'CLOSE_MODAL',
             }),
             Observable.of({
               type: 'UPDATE_PRODUCT_IN_STORE',
               id: json.response.id,
               description: json.response.description,
               name: json.response.name,
               groups: json.response.groups,
               locations: json.response.locations,
               ptype: json.response.ptype,
             })),
           )
        .race(
          action$.ofType('CANCEL')
            .map(() => canceled())
            .take(1),
          )
        .catch(error => Observable.of({
          type: 'LOAD_ERROR',
          payload: error,
          error: true,
        })),
      ));
export const refreshEpic = action$ =>
  action$.ofType('REFRESH')
    .mergeMap(() =>
      ajax({ url: 'https://www.sublation.nl//web/app_dev.php/users/refresh', headers: { credentials: 'include' } })
        .flatMap(json =>
          Observable.concat(
            Observable.of({
              type: 'GET_TOKEN',
              json: json.response,
            }),
            Observable.of({
              type: 'RESUME_LOAD',
            })),
       )
       .race(
         action$.ofType('CANCEL')
           .map(() => canceled())
           .take(1),
       )
       .catch(error => Observable.of({
         type: 'REFRESH_ERROR',
         payload: error.message,
         error: true,
       })),
    );

export const loginEpic = action$ =>
  action$.ofType('LOGIN')
  .delay(1)
  .flatMap(action =>
    Observable.concat(
    Observable.of({
      type: 'LOADING' },
    ),
   ajax({ url: `https://www.sublation.nl//web/app_dev.php/users/login?password=${action.pw}&name=${action.name}`, headers: { credentials: 'include' } })
   .flatMap(json =>
     Observable.concat(
       Observable.of({
         type: 'GET_TOKEN',
         json: json.response.token,
       }),
       Observable.of({
         type: 'LOAD_COMPLETE',
       }),
       Observable.of({
         type: 'INITIALIZE',
       }),


     ),
     )

  .race(
    action$.ofType('CANCEL')
      .map(() => loginCanceled())
      .take(1),
        )
  .catch(error =>
    Observable.concat(
      Observable.of({
        type: 'LOGIN_ERROR',
        payload: error,
        error: true,
      }),
      Observable.of({
        type: 'LOAD_COMPLETE',
      })),


)),
);
export const logOutEpic = action$ =>
  action$.ofType('LOG_OUT')
  .delay(1)
  .mergeMap(action =>
   ajax({ url: 'https://www.sublation.nl//web/app_dev.php/users/logout', headers: { credentials: 'include' } })
   .flatMap(json =>
     Observable.concat(
              Observable.of({
                type: 'LOGGED_OUT',
              }),
            ),
     )

  .race(
    action$.ofType('CANCEL')
      .map(() => loginCanceled())
      .take(1),
        )
  .catch(error => Observable.of({
    type: 'LOGIN_ERROR',
    payload: error.message,
    error: true,
  })),
);
export const loadGmapsEpic = action$ =>
  action$.ofType('LOAD_GMAPS')
  .delay(1)
  .mergeMap(action =>
   ajax({ url: `https://maps.googleapis.com/maps/api/js?key=${action.apiKey}`,
     crossDomain: true,
     createXHR() {
       return new XMLHttpRequest();
     },


   })
   .flatMap(json =>
     Observable.concat(
              Observable.of({
                type: 'GM_INCOMING',
                json,
              }),
            ),
     )

  .race(
    action$.ofType('CANCEL')
      .map(() => loginCanceled())
      .take(1),
        )
  .catch(error => Observable.of({
    type: 'GM_LOAD_ERROR',
    payload: error.message,
    error: true,
  })),
);
export const getUserEpic = (action$, store) =>
  action$.ofType('GET_USER')
    .flatMap(action =>
      Observable.concat(
        Observable.of({
          type: 'LAST_ACTION',
          action,
        }),
        Observable.of({
          type: 'LOADING',
        }),
        ajax({ url: 'https://www.sublation.nl//web/app_dev.php/users/user', headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
        .flatMap(json =>
          Observable.concat(
            Observable.of({
              type: 'HANDLE_USER',
              json: json.response,
            }),
            Observable.of({
              type: 'LOAD_COMPLETE',
            }),

          ),
          )
          .race(
            action$.ofType('CANCEL')
              .map(() => canceled())
              .take(1),
          )
    .catch(error => Observable.of({
      type: 'LOAD_ERROR',
      payload: error,
      error: true,
    })),
  ));

