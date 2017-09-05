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
                    ajax({ url: 'https://www.sublation.nl/web/app_dev.php/users/refresh', headers: { credentials: 'include' } })
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
   ajax({ url: `https://www.sublation.nl/web/app_dev.php/products/single?ProductId=${action.id}`, headers: { Authorization: `Bearer ${action.token}`, 'Content-Type': 'application/json' } })
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
     ajax({ url: 'https://www.sublation.nl/web/app_dev.php/products/getall', headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
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
     ajax({ url: `https://www.sublation.nl/web/app_dev.php/products/productdelete?productId=${action.id}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
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
      ajax({ url: `https://www.sublation.nl/web/app_dev.php/products/new?ProductName=${action.name}&&description=${action.description}&&${action.groups}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
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
         ajax({ url: `https://www.sublation.nl/web/app_dev.php/products/editproduct?ProductId=${action.id}&&ProductName=${action.name}&&ProductDescription=${action.description}&&${action.groups}`, headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
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
      ajax({ url: 'https://www.sublation.nl/web/app_dev.php/users/refresh', headers: { credentials: 'include' } })
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
   ajax({ url: `https://www.sublation.nl/web/app_dev.php/users/login?password=${action.pw}&name=${action.name}`, headers: { credentials: 'include' } })
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
         type: 'GET_USER',
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
   ajax({ url: 'https://www.sublation.nl/web/app_dev.php/users/logout', headers: { credentials: 'include' } })
   .flatMap(json =>
     Observable.concat(
              Observable.of({
                type: 'LOGGED_OUT',
              })),
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
        ajax({ url: 'https://www.sublation.nl/web/app_dev.php/users/user', headers: { Authorization: `Bearer ${store.getState().connection.token}`, 'Content-Type': 'application/json' } })
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

