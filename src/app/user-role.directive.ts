import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective {
  @Input() userRole: string | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    // verificamos el rol del usuario y es lo que mostraremos en el DOM
    if(this.userRole !== 'admin'){
      // renderiza solo si está con el rol admin
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
