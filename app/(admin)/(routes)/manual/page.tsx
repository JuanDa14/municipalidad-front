import { Separator } from '@/components/ui/separator';

const ManualPage = () => {
	return (
		<div className='p-6 space-y-3'>
			<h2 className='text-2xl font-bold'>Manual de usuario</h2>
			<Separator />
			<div className='space-y-3 border p-3 rounded'>
				<div>
					<h2 className='text-xl font-semibold'>Dashboard</h2>
					<p className='text-muted-foreground'>
						En este módulo se puede apreciar los datos estadísticos de información general
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Usuarios</h2>
					<p className='text-muted-foreground'>
						En este módulo se pueden manipular el acceso y el registro de los usuarios dentro
						del sistema, lo gestiona solo el personal con el rol de administrador.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Roles</h2>
					<p className='text-muted-foreground'>
						En los roles se asignan los roles definidos por la empresa ya sean si ponerlos en
						inactivos o no.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Reportes</h2>
					<p className='text-muted-foreground'>
						En el módulo de reportes aparecen dos opciones en la parte superior, en estas
						están las opciones de gráficos y reportes, para los cuales se encuentra un
						desplegable en donde se selecciona tanto el año como el mes del cual se quiere
						conocer los reportes, al seleccionar los años y/o meses se generarán
						automáticamente los gráficos y reportes.
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Clientes</h2>
					<p className='text-muted-foreground'>
						En el módulo de clientes se visualizan y buscan a los ciudadanos registrados en el
						sistema, al hacer click en el botón de nuevo cliente se abre un menú en donde se
						busca a la persona por su DNI para una búsqueda más rápida; al finalizar de llenar
						los datos el cliente se registra y ya se le pueden emitir los recibos y demás
						servicios.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Servicios</h2>
					<p className='text-muted-foreground'>
						En este módulo se puede visualizar los servicios, así como generar danto click en
						el botón nuevo servicio.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Solicitudes</h2>
					<p className='text-muted-foreground'>
						En el módulo de solicitudes se pueden registrar nuevas solicitudes, pero solo
						pueden ser aprobadas o rechazadas por el rol de administrador. En esta se pueden
						subir archivos pdf en donde está la solicitud presentada por el cliente.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Recibos</h2>
					<p className='text-muted-foreground'>
						En el módulo de recibos como tal se pueden visualizar los recibos realizados por
						las diferentes personas, también se pueden ver los detalles si se cliclea el botón
						con el ícono del ojo, o imprimir en el ícono de la impresora. Al crear un nuevo
						recibo se puede buscar por DNI para acelerar la búsqueda de la persona dentro del
						sistema, luego se selecciona los meses y el monto, si es un servicio de pago
						mensual, las fechas de cuando se realiza l pago debe ser mayor a la fecha del
						último pago, en el recibo emitido en pdf también se puede ver un QR que al momento
						de escanearlo el ciudadano puede ver sus propios detalles.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Proveedores</h2>
					<p className='text-muted-foreground'>
						En el módulo de proveedores y registran y aprecian los proveedores de la empresa o
						empresas que están asociadas con la municipalidad.{' '}
					</p>
				</div>
				<div>
					<h2 className='text-xl font-semibold'>Configuración</h2>
					<p className='text-muted-foreground'>
						Este módulo te permite configurar algunas de tus credenciales dentro del sistema,
						desde tu foto de perfil hasta el correo electrónico o datos personales
					</p>
				</div>
			</div>
		</div>
	);
};
export default ManualPage;
