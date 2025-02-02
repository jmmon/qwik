/* eslint-disable */
import { component$, useStore, useResource$, Resource } from '@builder.io/qwik';
import { delay } from './resource';

export const ResourceSerialization = component$(() => {
  const state = useStore({
    count0: 0,
    count1: 0,
  });
  const resourceSuccess = useResource$(
    async () => {
      await delay(100);
      return 'Success';
    },
    {
      timeout: 1000,
    }
  );
  const resourceFailure = useResource$(async () => {
    await delay(100);
    throw new Error('failed');
  });
  const resourceTimeout = useResource$(
    async () => {
      await delay(1000);
      return 'Success';
    },
    {
      timeout: 100,
    }
  );

  return (
    <>
      <Resource
        resource={resourceSuccess}
        onResolved={(data) => (
          <button class="success r1" onClick$={() => state.count0++}>
            PASS: {data} {state.count0}
          </button>
        )}
        onRejected={(reason) => (
          <button class="failure r1" onClick$={() => state.count1++}>
            ERROR: {String(reason)} {state.count1}
          </button>
        )}
      />
      <Resource
        resource={resourceFailure}
        onResolved={(data) => (
          <button class="success r2" onClick$={() => state.count0++}>
            PASS: {data} {state.count0}
          </button>
        )}
        onRejected={(reason) => (
          <button class="failure r2" onClick$={() => state.count1++}>
            ERROR: {String(reason)} {state.count1}
          </button>
        )}
      />
      <Resource
        resource={resourceTimeout}
        onResolved={(data) => (
          <button class="success r3" onClick$={() => state.count0++}>
            PASS: {data} {state.count0}
          </button>
        )}
        onRejected={(reason) => (
          <button class="failure r3" onClick$={() => state.count1++}>
            ERROR: {String(reason)} {state.count1}
          </button>
        )}
      />
    </>
  );
});
