var formGroup = Vue.component('form-group', {
    template: `
        <div class="form-group">
            <label :for="id">{{ label }}</label>
            <slot></slot>
            <span>{{ errors.first('teste') }}</span>
        </div>
    `,
    props: {
        label: String,
        id: String
    }
  });