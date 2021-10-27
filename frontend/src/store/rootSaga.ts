import { all, spawn, call } from 'redux-saga/effects';
import { watchIncrementCounterSaga } from './modules/counter/saga';
import { watchGetProductsSaga } from './modules/products/saga'

export default function* allSagas() {
  const sagas = [
      watchIncrementCounterSaga,
      watchGetProductsSaga
  ];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(`Error ${e}`);
          }
        }
      })
    )
  );
}
