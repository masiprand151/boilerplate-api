function createFetchClient(config = {}) {
  const { baseURL = "", headers = {}, timeout = 10000 } = config;

  const requestInterceptors = [];
  const responseInterceptors = [];

  async function coreFetch(url, options = {}) {
    let finalUrl = baseURL + url;

    let finalOptions = {
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...options.headers,
      },
      ...options,
    };

    // =========================
    // REQUEST INTERCEPTOR
    // =========================
    for (const interceptor of requestInterceptors) {
      const result = await interceptor(finalUrl, finalOptions);
      if (result) {
        finalUrl = result.url || finalUrl;
        finalOptions = result.options || finalOptions;
      }
    }

    // =========================
    // TIMEOUT HANDLING
    // =========================
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(finalUrl, {
        ...finalOptions,
        signal: controller.signal,
      });

      clearTimeout(id);

      let data;
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      let response = {
        data,
        status: res.status,
        ok: res.ok,
        headers: res.headers,
      };

      // =========================
      // RESPONSE INTERCEPTOR
      // =========================
      for (const interceptor of responseInterceptors) {
        response = await interceptor(response);
      }

      if (!res.ok) {
        throw response;
      }

      return response;
    } catch (err) {
      if (err.name === "AbortError") {
        throw {
          message: "Request timeout",
          isTimeout: true,
        };
      }
      throw err;
    }
  }

  // =========================
  // METHOD HELPERS
  // =========================
  const client = {
    get: (url, options = {}) => coreFetch(url, { ...options, method: "GET" }),

    delete: (url, options = {}) =>
      coreFetch(url, { ...options, method: "DELETE" }),

    post: (url, body, options = {}) =>
      coreFetch(url, {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      }),

    put: (url, body, options = {}) =>
      coreFetch(url, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      }),

    patch: (url, body, options = {}) =>
      coreFetch(url, {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body),
      }),

    // =========================
    // INTERCEPTORS
    // =========================
    interceptors: {
      request: {
        use: (fn) => requestInterceptors.push(fn),
      },
      response: {
        use: (fn) => responseInterceptors.push(fn),
      },
    },
  };

  return client;
}

module.exports = createFetchClient;
