import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RegistroMedicamentosComponent } from './pages/registro-medicamentos/registro-medicamentos.component';
import { EditarMedicamentosComponent } from './pages/editar-medicamentos/editar-medicamentos.component';
import { ClientePesquisaComponent } from './pages/cliente-pesquisa/cliente-pesquisa.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';


export const routes: Routes = [

    {
        path: "login",
        component: LoginComponent
    },

    {
        path: "cadastro",
        component: CadastroComponent
    },

    {
        path: "registro",
        component: RegistroMedicamentosComponent
    },

    {
        path: "editar",
        component: EditarMedicamentosComponent
    },

    {
        path: "cliente",
        component: ClientePesquisaComponent
    },

    {
        path: "funcionario",
        component: FuncionarioComponent
    }
];
