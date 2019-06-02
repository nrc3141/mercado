var formGroup = Vue.component('input-text', {
    template: `
          <form-group :label="label" :id="id">
             <input 
                 :type="tipo || 'text'"  
                 v-bind:value="valor" 
                 @input="$emit('input', $event.target.value)" 
                 class="form-control" 
                 :id="id"
                 :name="id"/>
         </form-group> 
    `,
    props: ['label', 'id', 'valor', 'tipo']
  });