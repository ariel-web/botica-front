<template>
  <!-- <q-btn label="Full Width" color="primary" @click="modalAgregar = true" /> -->
  <div class="">
    <!-- <q-table
      class="q-mt-md tablaUsuarios"
      grid
      :filter="filter"
      no-data-label="No hay usuarios"
      :columns="columns"
      :rows="usuarios"
      hide-pagination
      row-key="uid"
      hide-header
      hide-bottom
      v-model:pagination="pagination"
      style="margin-top:-20px;"
    >
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>

      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="600"
          v-model="filter"
          placeholder="Buscar"
          style="
            background: #f3f3f3;
            padding-left: 15px;
            padding-right: 10px;
            border-radius: 40px;
          "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="" v-if="actualizar == true" >
          {{obtenerUsuarios()}}
        </div>
        {{actualizar}}
         BTN AGREGAR USUARIO -->
        <!-- <q-btn flat round dense icon="person_add" style="margin-left: 10px; font-size:1.1rem; background:#f3f3f3;" @click="drawerRight = !drawerRight"/> -->
        <!-- BTN AGREGAR USUARIO -->

      <!-- </template>

      <template v-slot:item="props">
        <Itemus :props="props.row" @stateUser="actualizar = $event"/> -->
        <!-- <ItemUsuarioII :props="props.row" @stateUser="actualizar = $event"/>
      </template> -->


    <!-- </q-table> -->

    <q-table
      class="q-mt tablaUsuarios"
      grid-header
      :filter="filter"
      no-data-label="No hay usuarios"
      :columns="columns"
      :rows="usuarios"
      row-key="id"
      v-model:pagination="pagination"
      style=" padding-left: 20px;  padding-right:20px; "
    >
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>


      <template v-slot:top-right>

        <q-btn flat round dense icon="person_add_alt" class="openModal"  @click="modalAgregar = true" />

        <q-input
          borderless
          dense
          debounce="600"
          v-model="filter"
          placeholder="Buscar"
          style="
            background: #f3f3f3;
            padding-left: 15px;
            padding-right: 10px;
            border-radius: 40px;
            margin-bottom:-10px;
          "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

      </template>

      <template v-slot:header="props" >
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:0.9rem; font-weight:700; background:white; color:gray-8;"
          >
            {{ col.label }}
          </q-th>

        </q-tr>
      </template>

      <template v-slot:body="props"  >
        <q-tr :props="props" style=" border:3px solid red !important; ">
          <q-td key="id" :props="props"  style="width:50px" >
            <span style="font-size:0.8rem"> EMP{{ props.row.id }}</span>
          </q-td>
          <q-td key="foto" :props="props" style="width:50px" >
            <div style="border-radius:50%; width:30px; height:30px; overflow:hidden;">
              <div v-if="props.row.imagen != null">
                <img :src="props.row.foto" width="30" alt="">
              </div>
              <div v-else style="background:#cdcdcd9D;">
                <img src="../../assets/imagenes/businessman.png" width="30" height="30">
              </div>
             </div>
          </q-td>
          <q-td key="nombre" :props="props"  style="width:50px" >
            <span style="font-size:0.8rem"> {{ props.row.nombre }}</span>
          </q-td>
          <q-td key="apellidos" :props="props" width="50px" >
            <span style="font-size:0.8rem"> {{ props.row.apellidos }}</span>
          </q-td>
          <q-td key="cargo" :props="props" width="50px" >
            <span style="font-size:0.8rem">{{ props.row.cargo }}</span>
          </q-td>
          <q-td key="celular" :props="props" width="50px" >
            <span style="font-size:0.8rem"> {{ props.row.celular }} </span>
          </q-td>
          <q-td key="rol" :props="props" width="50px" >
            <span style="font-size:0.8rem">{{ props.row.rol == 0? 'Usuario' : 'Administrador' }}</span>
          </q-td>

          <q-td key="estado" :props="props" style="width:50px;" >
            <div v-if="props.row.estado != props.row.estadoItem" style="display:none;">
              {{ ActualizarEstado(props.row.id, props.row.estado) }}
            </div>

            <span v-if="props.row.estado == false" style="color:black; font-size:0.8rem;">Inactivo</span>
            <span v-else style="color:gray; font-size:0.8rem" >Inactivo </span>

             <q-toggle v-model="props.row.estado"  color="purple" keep-color />
            <span v-if="props.row.estado == true" style="font-weight:500; color:purple; font-size:0.8rem">Activo</span>
            <span v-else  style="font-size:0.8rem; color:gray;">Activo</span>
          </q-td>

          <q-td key="opciones" :props="props" style="width:150px; ">
            <div style="display:flex; margin-left:20px;">
              <div style="border:solid 0.5px #00000031; padding:5px 7px; margin-right:15px;">
                <q-icon name="border_color" size="1rem" class="editItem" @click="editarAbrir(props.row)"/>
              </div>
              <div style="border:solid 0.5px #00000031; padding:3px 5px; margin-right:20px;">
                <q-icon name="delete" size="1.2rem" class="removeItem" @click="EliminarUsuario(props.row.id)"/>
              </div>
            </div>
          </q-td>

        </q-tr>
      </template>


    </q-table>
  </div>

  <q-dialog
      v-model="modalAgregar"
      full-width
    >
    <div>
    <form class="agregarsucursal" @submit.prevent="AgregarUsuarios" enctype="multipart/formdata">

      <div style="margin-left:270px; ">
        <div style="display:flex; background:white;">
          <!-- MODAL ADD LADO DERECHO -->
          <div style="width:350px; height:560px; background:white; padding-left:20px; padding-right:20px; padding-top:20px; background: #000000D9; "  >
            <div style="position:relative; height:40px; margin-top:-8px; border-bottom:0px solid crimson;">
              <span style="font-weight:500; color:white; font-size:1.3rem; ">&nbsp;</span>
            </div>
            <!-- input  file -->
            <div class="container-input" style="display:flex; justify-content:center; align-content:center;">
              <input type="file" name="file-5" id="file-5" class="inputfile inputfile-5" @change="buscarImagen($event)" />
              <label for="file-5">
                <div v-if="foto !== null" style="display:flex; justify-content:center;  margin-bottom: 16px; margin-top:16px; overflow:hidden; border-radius:50%; height:200px; width:200px; border: 3px solid crimson;">
                  <img :src="foto" height="200" />
                </div>
                <div v-else style="display:flex; justify-content:center; text-align:center;  align-items:center; margin-bottom: 16px; margin-top:16px; overflow:hidden; border-radius:50%; height:200px; width:200px; border: 3px solid crimson; background:gray;">
                  <div style="position:relative; cursor:pointer;">
                    <img src="../../assets/man.png" width="200" style="border-radius:50%;"  />
                    <div style="position:absolute; height:50px; bottom:0; width:100%; display:flex; align-items:center; justify-content:center; ">
                      <p style="color:white; font-weight:700; background:#00000021; padding:5px 10px; ">Cambiar Imagen</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <!-- end input file -->
            <span style="color:white; margin-botttom:3px;">Cargo: {{cargo}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              type="text"
              v-model="cargo"
              placeholder="Cargo"
              style="margin-bottom: 16px;"
              class="inputUsuario"
            >
              <template v-slot:prepend>
                <q-icon name="keyboard" color="negative" size="1.2rem"/>
              </template>
            </q-input>

            <span style="color:white; margin-botttom:3px;">Usuario: {{email}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              v-model="email"
              type="text"
              placeholder="Usuario"
              style="margin-bottom: 16px;"
              class="inputUsuario"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="negative" size="1.2rem"/>
              </template>
            </q-input>

            <span style="color:white; margin-botttom:3px;">Contraseña: {{password}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              style="margin-bottom: 16px;"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="negative" size="1.2rem"/>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  @click="isPwd = !isPwd"
                  size="1.2rem"
                />
              </template>

            </q-input>
          </div>

          <div style="width:700px; background:white">
            <div style=" padding:20px;">
              <div style="position:relative; height:40px; border-bottom:2px solid crimson;">
                <span style="font-weight:700; color:black; font-size:1.3rem; ">Datos del Empleado</span>
                <span class="cerrarModal" v-close-popup>x</span>
              </div>

              <div style=" width:100%; display:flex;">
                <div style="width:50%; padding-right: 20px; padding-top:10px;">
                  <span style="color:black; margin-bottom:15px;">Nombres: {{nombres}} </span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="nombres"
                    placeholder="Nombres"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">DNI: {{dni}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="dni"
                    placeholder="Dni"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>
                </div>


                <div style="width:50%; padding-top:10px; padding-left:10px;">
                  <span style="color:black; margin-bottom:15px;">Apellidos: {{apellidos}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="apellidos"
                    placeholder="Apellidos"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Celular: {{celular}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="celular"
                    placeholder="Cel Numero"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="phone" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                </div>

              </div>

              <div>
                <span style="color:black; margin-bottom:15px;">Direccion: {{direccion}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="direccion"
                    placeholder="Ejem. Av. América 118"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person_pin" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>
              </div>

              <div style=" width:100%; display:flex;">
                <div style="width:50%; padding-right: 20px; padding-top:10px;">
                  <span style="color:black; margin-bottom:15px;">Familiar: {{familiar}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="familiar"
                    placeholder="Ejem. Padrino"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="contact_page" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Sucursal: </span>
                  {{sucursal}}
                   <q-select
                      color="negative"
                      dense
                      outlined
                      v-model="sucursal"
                      :options="sucursales"
                      emit-value
                      map-options
                    >
                    <template v-slot:prepend>
                      <q-icon name="store" color="negative" size="1.2rem"/>
                    </template>
                      <template v-slot:option="{ itemProps, opt, selected }">
                        <q-item v-bind="itemProps">
                            <q-icon name="store" color="negative" size="1rem"/>
                            <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
                        </q-item>
                      </template>
                    </q-select>

                </div>


                <div style="width:50%; padding-top:10px; padding-left:10px;">
                  <span style="color:black; margin-bottom:15px;">Celular Familiar: {{numeroFamiliar}}</span>
                  <q-input
                    color="negative"
                    mask="###-###-###"
                    dense
                    outlined
                    type="text"
                    v-model="numeroFamiliar"
                    placeholder="Ejem. 984-844-189"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="contact_phone" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Rol: </span>
                  {{rol}}
                   <q-select
                      color="negative"
                      dense
                      outlined
                      v-model="rol"
                      :options="roles"
                      emit-value
                      map-options
                    >
                    <template v-slot:prepend>
                      <q-icon name="store" color="negative" size="1.2rem"/>
                    </template>
                      <template v-slot:option="{ itemProps, opt, selected }">
                        <q-item v-bind="itemProps">
                            <q-icon name="store" color="negative" size="1rem"/>
                            <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
                        </q-item>
                      </template>
                    </q-select>

                    <button class="buttonUsuario" type="submit">Registrar</button>
                </div>

              </div>


            </div>
          </div>

        </div>


          <!-- <q-btn flat label="OK" v-close-popup /> -->

      </div>

    </form>
    </div>
  </q-dialog>

  <q-dialog v-model="modalEditar" full-width >
    <div>
    <form class="agregarsucursal" @submit.prevent="EditarUsuario" enctype="multipart/formdata">

      <div style="margin-left:270px; ">
        <div style="display:flex; background:white;">
          <!-- MODAL ADD LADO DERECHO -->
          <div style="width:350px; height:560px; background:white; padding-left:20px; padding-right:20px; padding-top:20px; background: #000000D9; "  >
            <div style="position:relative; height:40px; margin-top:-8px; border-bottom:0px solid crimson;">
              <span style="font-weight:500; color:white; font-size:1.3rem; ">&nbsp;</span>
            </div>
            <!-- input  file -->
            <div class="container-input" style="display:flex; justify-content:center; align-content:center;">
              <input type="file" name="file-5" id="file-5" class="inputfile inputfile-5" @change="buscarImagen($event)" />
              <label for="file-5">
                <div v-if="foto !== null" style="display:flex; justify-content:center;  margin-bottom: 16px; margin-top:16px; overflow:hidden; border-radius:50%; height:200px; width:200px; border: 3px solid crimson;">
                  <img :src="foto" height="200" />
                </div>
                <div v-else style="display:flex; justify-content:center; text-align:center;  align-items:center; margin-bottom: 16px; margin-top:16px; overflow:hidden; border-radius:50%; height:200px; width:200px; border: 3px solid crimson; background:gray;">
                  <div style="position:relative; cursor:pointer;">
                    <img src="../../assets/man.png" width="200" style="border-radius:50%;"  />
                    <div style="position:absolute; height:50px; bottom:0; width:100%; display:flex; align-items:center; justify-content:center; ">
                      <p style="color:white; font-weight:700; background:#00000021; padding:5px 10px; ">Cambiar Imagen</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <!-- end input file -->
            <span style="color:white; margin-botttom:3px;">Cargo: {{cargo}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              type="text"
              v-model="cargo"
              placeholder="Cargo"
              style="margin-bottom: 16px;"
              class="inputUsuario"
            >
              <template v-slot:prepend>
                <q-icon name="keyboard" color="negative" size="1.2rem"/>
              </template>
            </q-input>

            <span style="color:white; margin-botttom:3px;">Usuario: {{email}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              v-model="email"
              type="text"
              placeholder="Usuario"
              style="margin-bottom: 16px;"
              class="inputUsuario"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="negative" size="1.2rem"/>
              </template>
            </q-input>

            <span style="color:white; margin-botttom:3px;">Contraseña: {{password}}</span>
            <q-input
              color="negative"
              bg-color="white"
              dense
              outlined
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              style="margin-bottom: 16px;"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="negative" size="1.2rem"/>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  @click="isPwd = !isPwd"
                  size="1.2rem"
                />
              </template>

            </q-input>
          </div>

          <div style="width:700px; background:white">
            <div style=" padding:20px;">
              <div style="position:relative; height:40px; border-bottom:2px solid crimson;">
                <span style="font-weight:700; color:black; font-size:1.3rem; ">Datos del Empleado</span>
                <span class="cerrarModal" v-close-popup>x</span>
              </div>

              <div style=" width:100%; display:flex;">
                <div style="width:50%; padding-right: 20px; padding-top:10px;">
                  <span style="color:black; margin-bottom:15px;">Nombres: {{nombres}} </span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="nombres"
                    placeholder="Nombres"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">DNI: {{dni}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="dni"
                    placeholder="Dni"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>
                </div>


                <div style="width:50%; padding-top:10px; padding-left:10px;">
                  <span style="color:black; margin-bottom:15px;">Apellidos: {{apellidos}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="apellidos"
                    placeholder="Apellidos"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="keyboard" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Celular: {{celular}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="celular"
                    placeholder="Cel Numero"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="phone" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                </div>

              </div>

              <div>
                <span style="color:black; margin-bottom:15px;">Direccion: {{direccion}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="direccion"
                    placeholder="Ejem. Av. América 118"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person_pin" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>
              </div>

              <div style=" width:100%; display:flex;">
                <div style="width:50%; padding-right: 20px; padding-top:10px;">
                  <span style="color:black; margin-bottom:15px;">Familiar: {{familiar}}</span>
                  <q-input
                    color="negative"
                    dense
                    outlined
                    type="text"
                    v-model="familiar"
                    placeholder="Ejem. Padrino"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="contact_page" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Sucursal: </span>
                  {{sucursal}}
                   <q-select
                      color="negative"
                      dense
                      outlined
                      v-model="sucursal"
                      :options="sucursales"
                      emit-value
                      map-options
                    >
                    <template v-slot:prepend>
                      <q-icon name="store" color="negative" size="1.2rem"/>
                    </template>
                      <template v-slot:option="{ itemProps, opt, selected }">
                        <q-item v-bind="itemProps">
                            <q-icon name="store" color="negative" size="1rem"/>
                            <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
                        </q-item>
                      </template>
                    </q-select>
                </div>

                <div style="width:50%; padding-top:10px; padding-left:10px;">
                  <span style="color:black; margin-bottom:15px;">Celular Familiar: {{numeroFamiliar}}</span>
                  <q-input
                    color="negative"
                    mask="###-###-###"
                    dense
                    outlined
                    type="text"
                    v-model="numeroFamiliar"
                    placeholder="Ejem. 984-844-189"
                    style="margin-bottom: 16px; margin-top:3px;"
                    class="inputUsuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="contact_phone" color="negative" size="1.2rem"/>
                    </template>
                  </q-input>

                  <span style="color:black; margin-bottom:15px;">Rol: </span>
                  {{rol}}
                   <q-select
                      color="negative"
                      dense
                      outlined
                      v-model="rol"
                      :options="roles"
                      emit-value
                      map-options
                    >
                    <template v-slot:prepend>
                      <q-icon name="store" color="negative" size="1.2rem"/>
                    </template>
                      <template v-slot:option="{ itemProps, opt, selected }">
                        <q-item v-bind="itemProps">
                            <q-icon name="store" color="negative" size="1rem"/>
                            <q-item-label style="margin-left:5px;" v-html="opt.label" :model-value="selected" />
                        </q-item>
                      </template>
                    </q-select>
                    <button class="buttonUsuario" type="submit">Registrar</button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </form>
    </div>
  </q-dialog>

  <div v-if="modalEditar == false" style="display:none">
    {{Limpiar()}}
  </div>

</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
//import Itemus from '../../components/usuarios/Itemus.vue'
import ItemUsuarioII from '../../components/usuarios/ItemUsuarioII.vue'
const columns = [
  {
    name: "id",
    label: "Codigo",
    align: "center",

  },
  {
    name: "foto",
    label: "Foto",
    align: "left",
    field: "foto",
  },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellidos",
    label: "Apellidos",
    align: "left",
    field: "apellidos",
    sortable: true,
  },
  {
    name: "cargo",
    label: "Cargo",
    align: "left",
    field: "cargo",
    sortable: true,
  },
  {
    name: "celular",
    label: "Celular",
    align: "left",
    field: "celular",
  },
  {
    name: "rol",
    label: "Rol",
    align: "left",
    field: "rol",
    sortable: true,
  },
  {
    name: "estado",
    label: "Estado",
    align: "center",
  },
  {
    name: "opciones",
    label: "Opciones",
    align: "center",
  },
];

const rows = [
  {
    nombre: "productp 1",
    correo: "opcion1",
  },
];

export default {
  components: {    },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 8,
      // rowsNumber: xx if getting data from a server
    });
    return {
      columns,
      rows,
      pagination,
      UsuarioAgregadaNoty () {
        $q.notify({
          position:'top-right',
          type: 'positive',
          message: 'Usuario Agregado!!.'
        })
      },
      UsuarioEliminadaNoty() {
        $q.notify({
          position:'top-right',
          type: 'negative',
          message: 'Usuario Eliminado!!.'
        })
      },
      NotyfiVarios(mensaje, color) {
        $q.notify({
          position:'top',
          color:color,
          message: mensaje
        })
      },

      UsuarioActulizadoNoty() {
        $q.notify({
          position:'top-right',
          color:'green',
          message: 'Usuario Actualizado!!.'
        })
      },

      modalAgregar: ref(false),
      modalEditar: ref(false),
      isPwd: ref(true),
    };
  },
  data() {
    return {
      editarID: null,
      stadex: false,
      usuarios:[],
      filter:"",
      actualizar : false,
      file: null,
      nombres:"",
      apellidos:"",
      dni:"",
      celular:"",
      direccion:"",
      estado:"",
      cargo:"",
      email:"",
      password:"",
      familiar:"",
      numeroFamiliar:"",
      sucursal:0,
      rol:0,
      foto:null,
      sucursales:[],
      roles:[
        {
          "label":"Vendedor",
          "value":0
        },
        {
          "label":"Administrador",
          "value":1
        },
      ]

    }
  },
  mounted(){
    this.ObtenerSucursales()
    this.ObtenerUsuarios()
  },

  methods:{
    //BUSCAR IMAGEN

    ObtenerSucursales() {
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
        axios.get('http://localhost:8000/admin/sucursales', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let resultSucursales = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              resultSucursales.push(
                {
                  label: item.suc_nombre.trim(),
                  value: item.id,
                }
              );
            }
            this.sucursales = resultSucursales
            this.sucursal = resultSucursales[0]
          }

        })

    },

    ObtenerUsuarios() {
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
        axios.get('http://localhost:8000/admin/usuarios', config)
        .then(response => {
          let len = response.data.length;
          console.log(len)
          if( len >= 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = response.data[i];
              let std = false;
              if(response.data[i].estado != 0){
                std = true;
              }
              result.push(
                {
                  id: item.id,
                  nombre: item.nombre,
                  apellidos: item.apellidoPaterno,
                  dni: item.dni,
                  celular: item.celular,
                  direccion: item.direccion,
                  estado: std,
                  estadoItem: std,
                  email: item.email,
                  rol: item.rol,
                  cargo: item.cargo,
                  familiar: item.familiar,
                  sucursal: item.sucursal,
                  familarNumero: item.familiar_numero,
                  imagen: item.foto,
                  foto: "http://localhost:8000/usuarios/"+item.foto,
                }
              );
            }
            this.usuarios = result

          }
        })

    },

    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;
      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.file = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.foto = e.target.result;
      };
    },

    AgregarUsuarios() {

      const formdata = new FormData()
      formdata.append('nombre', this.nombres),
      formdata.append('apellidoPaterno',this.apellidos),
      formdata.append('dni', this.dni),
      formdata.append('celular', this.celular),
      formdata.append('direccion', this.direccion),
      formdata.append('estado', 0),
      formdata.append('email',this.email),
      formdata.append('password', this.password),
      formdata.append('rol', this.rol),
      formdata.append('cargo', this.cargo),
      formdata.append('familiar', this.cargo),
      formdata.append('familiar_numero', this.numeroFamiliar)
      if( this.file != null ){
        formdata.append('foto', this.file)
      }
      let url = "http://localhost:8000/admin/usuarios"
      let token = localStorage.getItem('token');
      const config = {
          'accept': 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            console.log(response.data)
            this.ObtenerUsuarios()
            this.UsuarioAgregadaNoty()
            this.modalAgregar = false
            this.Limpiar()
        }else {
          this.msgError = "Usuario no registrado"
          console.log(response.status);
        }
      }).catch(error => {
        console.log(error.response.data)
        this.NotyfiVarios("El Usuario ya Existe", "negative")
      })

    },

    EditarUsuario() {
      const id = this.editarID
      const formdata = new FormData()
      formdata.append('nombre', this.nombres),
      formdata.append('apellidoPaterno',this.apellidos),
      formdata.append('dni', this.dni),
      formdata.append('celular', this.celular),
      formdata.append('direccion', this.direccion),
      formdata.append('email',this.email),
      formdata.append('rol', this.rol),
      formdata.append('cargo', this.cargo),
      formdata.append('sucursal', this.sucursal),
      formdata.append('familiar', this.cargo),
      formdata.append('familiar_numero', this.numeroFamiliar)
      if (this.password != null){
        formdata.append('password', this.password)
      }
      if( this.file != null ){
        formdata.append('foto', this.file)
      }

      formdata.append('_method', 'PUT')
      let url = `http://localhost:8000/admin/usuarios/${id}`
      let token = localStorage.getItem('token');
      const config = {
          accept: 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            this.ObtenerUsuarios()
            this.modalEditar = false
            this.UsuarioActulizadoNoty()
            this.Limpiar()
        }else {
          this.msgError = "Usuario o contraseña Incorrecto"
          console.log(response.status);
        }
      })

    },

    EliminarUsuario(id) {
      let token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      axios.delete(`http://localhost:8000/admin/usuarios/${id}`, config)
      .then(response => {
        console.log(response)
        this.ObtenerUsuarios();
        this.UsuarioEliminadaNoty();
      })
    },

    editarAbrir(item) {
      this.modalEditar = true;
      this.editarID = item.id
      this.nombres = item.nombre
      this.apellidos = item.apellidos
      this.dni = item.dni
      this.celular = item.celular
      this.direccion = item.direccion
      this.estado = item.estado
      this.cargo = item.cargo
      this.email = item.email
      this.password = ""
      this.familiar = item.familiar
      this.numeroFamiliar = item.numeroFamiliar
      this.sucursal = item.sucursal
      this.rol = item.rol
      this.foto = item.foto

    },

    ActualizarEstado(id, estado) {

      const formdata = new FormData()
      let std = 0
      if( estado == true){
        std = 1
      }
      formdata.append('estado', std)
      formdata.append('_method', 'PUT')
      let url = `http://localhost:8000/admin/usuarios/${id}`
      let token = localStorage.getItem('token');
      const config = {
          accept: 'application/json',
          headers: { Authorization: `Bearer ${token}` }
      };
      axios.post(
        url,
        formdata,
        config
      )
      .then(response => {
        if(response.status == 200) {
            this.ObtenerUsuarios()
            this.UsuarioActulizadoNoty()
        }else {
          this.msgError = "Usuario o contraseña Incorrecto"
          console.log(response.status);
        }
      })

    },

    Limpiar() {
      this.editarID = null,
      this.nombres ="",
      this.apellidos="",
      this.dni="",
      this.celular="",
      this.direccion="",
      this.estado="",
      this.cargo="",
      this.email="",
      this.password="",
      this.familiar="",
      this.numeroFamiliar="",
      this.sucursal=0,
      this.rol = 0,
      this.foto = null,
      this.file = null
    }

  }
};
</script>

<style scoped>

.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
.cerrarModal {
  font-weight:700; color:#0000009D; font-size:1.3rem; position:absolute; right:10px; top:-5px; cursor: pointer;
}
.cerrarModal:hover {
  font-weight:500;
  color:crimson;
}

.tablaUsuarios {
  box-shadow: none;
}
.editItem {
  color: #0000c9;
}
.editItem:hover{
  cursor: pointer;
  color: #00007e;
}
.editItem:active{
  cursor: pointer;
  color: purple;
}

.removeItem {
  color: crimson;
}
.removeItem:hover{
  cursor: pointer;
  color: #92011e;
}
.removeItem:active{
  cursor: pointer;
  color: #d60000;
}
.openModal{
  margin-left: 10px; margin-top:10px; font-size:1.1rem; color:#000000DD;
}
.openModal:hover{
 color:crimson;
}
.openModal:active{
 color:#000000DD;
}


</style>
