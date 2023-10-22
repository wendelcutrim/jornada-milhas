import { Component } from '@angular/core';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
    title: string = 'Olá pessoa';
    btnText: string = 'atualizar';

    logout() {
        console.log('Logout realizado com sucesso!');
    }

    update() {
        console.log('Atualizar realizado com sucesso!');
    }
}
