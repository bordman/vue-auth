module.exports = {
  _init: function () {
      if ( ! this.options.Vue.axios) {
          return 'axios.js : Vue.axios must be set.'
      }
  },

  _interceptor: function (req, res) {
    var _this = this;

    if (req) {
      this.options.Vue.axios.interceptors.request.use(function (request) {
        req.call(_this, request);
        return request;
      }, function (error) {
        req.call(_this, error.request);
        return Promise.reject(error);
      })
    }

    if (res) {
      this.options.Vue.axios.interceptors.response.use(function (response) {
        res.call(_this, response);
        return response;
      }, function (error) {
        if (error && error.response) {
          res.call(_this, error.response);
        }

        return Promise.reject(error);
      })
    }
  },

  _invalidToken: function (res) {
    if(res !== undefined) {
      if (res.status === 401) {
        return true;
      }
    }
  },

  _httpData: function (res) {
      return res.data || {};
  },

  _http: function (data) {
    return this.options.Vue.axios(data).then(data.success, data.error);
  },

  _getHeaders: function (res) {
    if(res !== undefined){
      return res.headers;
    }
  },

  _setHeaders: function (req, headers) {
      req.headers.common = Object.assign(req.headers.common, headers);
  }
}
