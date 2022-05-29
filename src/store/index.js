import { createStore } from "vuex";

import axios from 'axios';

export default createStore( {

  state : {
    productos:[],
    compras: JSON.parse(localStorage.getItem("compras"))||{},
    ventas: JSON.parse(localStorage.getItem("ventas"))||{},
    tabcompras:"comprar",
    tabventas:"vender"
  },
  mutations:{
    setProducto(state, payload){
      state.productos = payload
    },
    setAddCompras(state, payload){
      state.compras[payload.id] =  payload
      localStorage.setItem('compras', JSON.stringify(state.compras))
    },
    vaciarCompras(state) {
      state.compras = {}
      localStorage.removeItem('compras');
    },
    aumentarItemCompra(state, payload) {
      localStorage.removeItem('compras');
      state.compras[payload].cantidad = state.compras[payload].cantidad + 1;
      localStorage.setItem('compras', JSON.stringify(state.compras))
    },
    disminuirItemCompra(state, payload) {
      localStorage.removeItem('compras');
      state.compras[payload].cantidad = state.compras[payload].cantidad - 1;
      if (state.compras[payload].cantidad === 0) {
        delete state.compras[payload]
      }
      localStorage.setItem('compras', JSON.stringify(state.compras))
    },
    eliminarItemCompra(state, payload) {
      localStorage.removeItem('compras');
      delete state.compras[payload]
      localStorage.setItem('compras', JSON.stringify(state.compras))
    },

    setTabCompras(state, payload) {
      state.tabcompras = payload
    },


    setAddVenta(state, payload){
      state.ventas[payload.id] =  payload
      localStorage.setItem('ventas', JSON.stringify(state.ventas))
    },
    vaciarVentas(state) {
      state.ventas = {}
      localStorage.removeItem('ventas');
    },
    aumentarItemVenta(state, payload) {
      localStorage.removeItem('ventas');
      state.ventas[payload].cantidad = state.ventas[payload].cantidad + 1;
      localStorage.setItem('ventas', JSON.stringify(state.ventas))
    },
    disminuirItemVenta(state, payload) {
      localStorage.removeItem('ventas');
      state.ventas[payload].cantidad = state.ventas[payload].cantidad - 1;
      if (state.ventas[payload].cantidad === 0) {
        delete state.ventas[payload]
      }
      localStorage.setItem('ventas', JSON.stringify(state.ventas))
    },
    eliminarItemVenta(state, payload) {
      localStorage.removeItem('ventas');
      delete state.ventas[payload]
      localStorage.setItem('ventas', JSON.stringify(state.ventas))
    },

    setTabVentas(state, payload) {
      state.tabventas = payload
    }

  },
  actions:{
    async ObtenerProductos({commit}) {
      try {
        let token = localStorage.getItem('token');
        let su =""
        if (localStorage.getItem('s') != null){
          su = localStorage.getItem('s')
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          params: {
            buscar: su
          }
        };
        await axios.get('http://localhost:8000/admin/productos', config)
        .then(response => {
          let len = response.data.length;
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              result.push(
                {
                  id: item.id,
                  idP: item.pre_idProducto,
                  nombre: item.pro_nombre,
                  sucursal: item.pro_idSucursal,
                  categoria: item.pro_idCategoria,
                  stock: item.pro_stock,
                  descuento: item.pro_descuento,
                  vencimiento: item.pro_vencimiento,
                  via: item.pro_viaAdministracion,
                  dosis: item.pro_dosis,
                  laboratorio: item.pro_laboratorio,
                  stock_min: item.pro_stock_minimo,
                  stock_max: item.pro_stock_maximo,
                  descripcion: item.pro_descripcion,
                  presentacion: item.pre_presentacion,
                  precio: item.pre_precio,
                  unidades: item.pre_cantidad,
                  imagen: item.pro_foto,
                  foto: "http://localhost:8000/productos/"+item.pro_foto,
                }
              );
            }
            commit('setProducto',result)
          }

        })
      } catch (e){
        console.log(e)
      }

    },

    addCompras({commit, state}, producto) {
      state.compras.hasOwnProperty(producto.id)
        ? producto.cantidad = state.compras[producto.id].cantidad + 1
        : producto.cantidad = 1
      commit('setAddCompras', producto)
    },

    addVentas({commit, state}, producto) {
      state.compras.hasOwnProperty(producto.id)
        ? producto.cantidad = state.compras[producto.id].cantidad + 1
        : producto.cantidad = 1
      commit('setAddVenta', producto)
    }

  },
  getters:{
    totalCantidad(state) {
      return Object.values(state.compras).reduce((acc, {cantidad}) => acc + cantidad, 0 )
    },
    totalPrecio(state) {
      return Object.values(state.compras).reduce((acc, {cantidad, precio}) => acc + cantidad*precio, 0.00 )
    },

    totalCantidadVenta(state) {
    return Object.values(state.compras).reduce((acc, {cantidad}) => acc + cantidad, 0 )
    },
    totalPrecioVenta(state) {
      return Object.values(state.compras).reduce((acc, {cantidad, precio}) => acc + cantidad*precio, 0.00 )
    }

  },
  modules:{

  }

});
