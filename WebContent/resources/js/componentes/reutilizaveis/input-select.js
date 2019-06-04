var formGroup = Vue.component('input-select', {
    template: `
          <form-group :label="label" :id="id">
             <select class="form-control" :id="id" v-bind:value="valor" @input="$emit('input', $event.target.value)" >
                    <option value="">Selecione</option>
                    <option v-for="item in lista" :value="item.valor">
                        {{ item.texto }}
                    </option>
                </select>
         </form-group> 
    `,
    props: ['label', 'id', 'valor', 'tipo', 'lista']
  });