let listElements = document.querySelectorAll('.list_button--click');

listElements.forEach(listElement => {
	listElement.addEventListener('click', ()=>{
		
		listElement.classList.toggle('arrow');

		let height = 0;
		let menu = listElement.nextElementSibling;
		if (menu.clientHeight == "0") {
			height=menu.scrollHeight;
		}

		menu.style.height = `${height}px`;
	})
});




// ====== VARIABLES ======
const zonaSubida = document.getElementById('zonaSubida');
const inputArchivo = document.getElementById('inputArchivo');
const previewImagen = document.getElementById('previewImagen');
const textoZona = document.getElementById('textoZona');
const inputTexto = document.querySelector('.input-texto');
const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

// ====== EVENTOS DE SUBIDA ======
zonaSubida.addEventListener('click', () => inputArchivo.click());

inputArchivo.addEventListener('change', () => {
  const archivo = inputArchivo.files[0];
  if (archivo && archivo.type.startsWith('image/')) {
    mostrarVistaPrevia(archivo);
  }
});

zonaSubida.addEventListener('dragover', (e) => {
  e.preventDefault();
  zonaSubida.classList.add('dragover');
});

zonaSubida.addEventListener('dragleave', () => {
  zonaSubida.classList.remove('dragover');
});

zonaSubida.addEventListener('drop', (e) => {
  e.preventDefault();
  zonaSubida.classList.remove('dragover');
  const archivo = e.dataTransfer.files[0];
  if (archivo && archivo.type.startsWith('image/')) {
    mostrarVistaPrevia(archivo);
  }
});

// ====== FUNCIONES ======
function mostrarVistaPrevia(archivo) {
  const lector = new FileReader();
  lector.onload = (e) => {
    previewImagen.src = e.target.result;
    previewImagen.style.display = 'block';
    textoZona.style.display = 'none';
    localStorage.setItem('imagenGuardada', e.target.result);
  };
  lector.readAsDataURL(archivo);
}

function limpiarCampos() {
  previewImagen.src = '';
  previewImagen.style.display = 'none';
  textoZona.style.display = 'block';
  inputArchivo.value = '';
  inputTexto.value = '';
  localStorage.removeItem('imagenGuardada');
  localStorage.removeItem('textoGuardado');
  mensajeConfirmacion.style.display = 'none';
}

// ====== BOTONES ======
document.getElementById('btnLimpiar').addEventListener('click', limpiarCampos);

document.getElementById('btnGuardar').addEventListener('click', () => {
  const texto = inputTexto.value;
  localStorage.setItem('textoGuardado', texto);

  // Mostrar mensaje verde
  mensajeConfirmacion.style.display = 'inline-block';
  mensajeConfirmacion.textContent = ' Guardado correctamente';

  // Ocultar después de 2.5 segundos
  setTimeout(() => {
    mensajeConfirmacion.style.display = 'none';
  }, 2500);
});

// ====== CARGA INICIAL ======
window.addEventListener('load', () => {
  const imagenGuardada = localStorage.getItem('imagenGuardada');
  const textoGuardado = localStorage.getItem('textoGuardado');

  if (imagenGuardada) {
    previewImagen.src = imagenGuardada;
    previewImagen.style.display = 'block';
    textoZona.style.display = 'none';
  }

  if (textoGuardado) {
    inputTexto.value = textoGuardado;
  }
});
