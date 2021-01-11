export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {

    "--navbar-color": "#1976d2",
    "--navbar-button": "#0d75b2",
    "--add-button": "#008000",
    "--text-color": "#ffffff",

    "--primary-background-form": "#f9f9f9",
    "--primary-header-card": "#ede5ff",
    "--primary-card-item": "#e5c5bc",

    "--add-btn-color": "#316131",
    "--primary-color-link":"#0071ff",

    "--secondary-btn-color":"#b9dde5",
    
    "--background-tertiary-shadow": "0 20px 50px rgba(0,0,0,.3)"
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {

    "--navbar-color": "#b1dfa9",
    "--navbar-button": "#4b7bac59",
    "--add-button": "#08090A",
    "--text-color": "#000000",

    "--primary-background-form": "#6ca5b26e",
    "--primary-header-card": "#24B286",
    "--primary-card-item": "#c0d7b8",
    "--add-btn-color": "#19a74b",

    "--primary-color-link":"#385880",
    "--secondary-btn-color":"#77bbcc",

    "--background-tertiary-shadow": "0 20px 50px rgba(255,255,255,.3)"
  }
};