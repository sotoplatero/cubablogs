# Mockups, Tests and Wireframes

## Categorías

<https://cubablog.net/post.json?url=96/lahabanaenclavedesol.blogspot.com/2021/09/adalberto-alvarez-defendera-la-musica.html>

## Layout

-   [bootstrap 5 cards + Mansory](https://getbootstrap.com/docs/5.0/examples/masonry/)

El header y el footer siempre están visibles, el contenido es el que se mueve.

La idea general es que el usuario haciendo sus acciones habituales tenga más contenido en lugar de dar una orden de cargar más, o enséñamela de nuevo y esas cosas. El usuario solo scrollea y toca enciende/apaga.

### Filtrar por categorías

Las categorías _badges_ al final de cada post _card_ se comportan como toggles. Si están en el filtro aparecen resaltadas (amarillito pollito) y si están en el filtro pero el post no tiene esa categoría aparecen resaltadas pero con el texto tachado ~~así como dice aquí.~~ Eso sirve para poder apagar categorías del filtro sin que necesariamente estén en el post que tienes delante. Como cuando buscas en Google un término que no aparece y te lo da tachado.

Eso combinado con el llenado infinito tiene su gracia que paso a explicarse

### Llenado infinito

Se usa una condición que puede ser vigilando el _main_ que toque el borde la pantalla o lo que sea, para cargar la próxima página automáticamente. Traes las página completa y una vez arriba aplicas el filtro, o sea, la única petición sería _next._ Si el universo está muy restringido la condición de llenado se seguirá cumpliendo así que sigues llenando. Eso garantiza que todo el contenido esté en el dispositivo.

Otro comportamiento que me parece interesante es que el contenido que tienes fijo en la columna derecha ahora lo puedes intercalar y surlo aleatoriamente en el caso de los chistes y las frases sin necesidad de darle a la flecha lo que ahora mismo es un poco raro. Las efemérides las cargas una sola vez.

En el caso de armar las páginas, cada vez puedes mandar parriba 10 posts, un chiste y una frase. Los contenidos fijos como los de descargarse la Gaceta y los patrocinados que vendrán seguramente, esos los mandas arriba arriba de primeros. Los chistes y las frases los puedes intercalar dåndole un agua aleatoria a la página, lo cual funcionaría ricamente porque el orden de los posts no es relevante para nada, ni cronológico ni consecutivo.

## Marcado semántico

Esto lo tocamos por arribita pero sería muy interesante poder caracterizar el contenido que saquemos del texto. Por ejemplo marcar personas, lugares, categorías... Tengo que echarle un vistazo a eso porque hace tiempo que no lo miro y seguramente ya el mundo anda por otro lao pero la idea de servir texto enriquecido en lugar de solo reproducir el texto que obtienes del _feed_ pondría la cosa a otro nivel. Hasta donde entiendo los motores de indexado sancionan el contenido duplicado así que si añadimos marcado estaríamos sirviendo algo distingo y agregando valor.  
