# Sahara Montes - Documentación Web final

- [Librerias, frameworks e I.A.](./tm112-sahara-montes)




## REFERENTES (27/04/2026)

- https://jaimerodriguezgomez.com : el inicio con las imagenes me gusta, se ve un poc minimalista
- https://jaimerodriguezgomez.com/proyectos/amor-en-pixeles/tomaaccion.html: Me gusta el tipo quiz, el tema de que el corazon se va degradando poco a poco me parece interesante
- https://jaimerodriguezgomez.com/proyectos/aguasoy/inicio: El como con la frase se puede volver al incio y que sea la paradoja, me encanta
- https://floor796.com/#t3l5,277,784 : Me parece super interesante como con las imagenes podemos llegar a la información de los personajes, ademas de que es super interactivo
- https://cargo.site/templates/preview/3433978 : que la imagen y las enntradas sean inconos, me encanta
- https://cargo.site/templates/preview/3222532: que el incio sea asi de minimmalista

## Ligthouse
![](https://notes.commonscomputer.com/uploads/82d2b308-b132-4d2b-a027-fffee902ad89.png)

## Medio Interactivo:
- osc(40,0.2,1)
  .modulateScale(osc(40,0,1).kaleid(8))
  .repeat(2,4)
  .modulate(o0,0.05)
  .modulateKaleid(shape(4,0.1,1))
  .out(o0)
  ![](https://notes.commonscomputer.com/uploads/f30ee40d-2429-434f-b248-e2e3ba4c22a3.png)

- pattern = () => osc(200, 0).kaleid(200).scale(1, 0.4)
//
pattern()
  .scrollX(0.1, 0.01)
  .mult(pattern())
  .out()
  
  ![](https://notes.commonscomputer.com/uploads/f9ef616b-1234-4b8b-a010-3504a8d54ff3.png)
  
- shape(() => Math.sin(time)+1*2)
.rotate(() => Math.PI * mouse.x /180)
.repeatX(3)
.repeatY(()=>Math.sin(time)*5)
.scale(() => Math.PI/4)
.blend(src(o0).color(1,0,0))
.modulate(osc(20, 0,.4))
.kaleid(2)
 .out(o0)

render(o0)

![](https://notes.commonscomputer.com/uploads/03799bc2-4d9a-4398-90db-82be1163186b.png)

### Repositorios:
- https://github.com/jaimander/nm/blob/main/index.html: Frase azul
- ![](https://notes.commonscomputer.com/uploads/5d1baefa-bb92-4fc9-bec0-b2aefb17f0f2.png)

## Planteamiento:
  - Pagina con estilo Casino
  - Narrativa: El usuario entra al mundo de los casinos, pensando que iba a ganar, al final se da cuenta que los casinos sn juegos injustos
  - MENSAJE: " Nunca estuvite cerca de salir" 
  - Cambio de ambiente cuando el usuario se de cuenta que esta atrapado
  - Un total de 7-10 paginas
  - Hacerlo tipo minimalista/futurista
  - Que sea como claustrofobia
  - Que no te deje salir solo hasta cerrar la pagina que todo sea un buncle
 
## Descubrimientos o complicaciones:
- Los cambios del 29/04: no me quisieron guardar entoces me toco hacerlo con el metodo de diego
- el 04/05 tuve que volver a hacer la pagina ya que no me cargaba al 100% los cambios hechos, se bloqueo la pagina
- Durante el desarrollo del proyecto descubrí que una página web no solo usa HTML, CSS y JavaScript, sino también otros formatos que ayudan a organizar mejor la información.
- Aprendí que JSON sirve para guardar datos de manera estructurada, como en el archivo metadata.json, donde se define información del proyecto sin necesidad de programación.
- También conocí TypeScript (TS), que es una versión más estructurada de JavaScript que ayuda a evitar errores y organizar mejor el código, aunque no lo usé directamente en la lógica principal.
- Para entender estos conceptos y resolver problemas, utilicé ChatGPT como apoyo, lo que me permitió avanzar y comprender mejor el desarrollo del proyecto.
- 

# Entrega 11 de mayo

