import {ArrayInputProps, SimpleFormIterator, ArrayInput, Datagrid, ArrayField, List, Create, SimpleForm, Toolbar, SelectInput, SaveButton, Edit, TextField, TabbedForm, FormTab, required, TextInput, DateField } from 'react-admin';
import {useRecordContext} from "react-admin";
import {useOnSuccess,} from '../hooks/costumhandlers';
import "../CSS/TicketUpdate.css";
import '../CSS/TicketCreate.css';

const TicketTitle = () => {
    const record = useRecordContext();
    return <span className="px-2 text-xl font-bold text-navy-700 dark:text-white flex items-center justify-center">{record ? `${record.titulo}` : ''}</span>;
    
};

// const InicioTextComponent = () => (
//     <div className="customTextComp">
//       <p>Inicio: </p>
//     </div>
// );

const AulaTextComponent = () => (
    <div className="customTextComp">
      <p>Aula: </p>
    </div>
);

const TituloTextComponent = () => (
    <div className="customTextComp">
      <p>Título: </p>
    </div>
);

const CategoriaTextComponent = () => (
    <div className="customTextComp">
      <p>Categoría: </p>
    </div>
);
const SubategoriaTextComponent = () => (
    <div className="customTextComp">
      <p>Tipo de Incidencia: </p>
    </div>
);
const PrioridadTextComponent = () => (
    <div className="customTextComp">
      <p>Prioridad: </p>
    </div>
);
const EstatusTextComponent = () => (
    <div className="customTextComp">
      <p> Estatus: </p>
    </div>
);
const EstatusCambioTextComponent = () => (
    <div className="customTextComp">
      <p> Cambiar Estatus: </p>
    </div>
);


const CustomArrayInput = (props : any) => {

    const customProps = { ...props };
    delete customProps.record;
    delete customProps.onAddClick;

    return (
        <ArrayInput {...customProps}>
        <SimpleFormIterator>
            <TextInput source="comentarios" label="Nuevo Comentario" />
        </SimpleFormIterator>
        </ArrayInput>
    );
};



export const TicketEdit = () => {
    return (
        <Edit title={<TicketTitle/>} >
        
           <TabbedForm >

            <FormTab label = "Ticket">
                
                <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

                    <div className="mt-2 mb-8 w-full">
                            < TicketTitle />
                    </div>
                
                    <div className="grid grid-cols-2 gap-4 px-2 w-full">
                        {/* <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <InicioTextComponent />
                            <DateField label="Inicio" source="inicio" showTime />
                        </div> */}   
                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <AulaTextComponent />
                            <TextField label="Aula" source="aula" />
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            < PrioridadTextComponent />
                            <TextField label="Prioridad" source="prioridad" />
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            < CategoriaTextComponent />
                            <TextField label="Categoría" source="categoria" />
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            < SubategoriaTextComponent />
                            <TextField label="Tipo de incidencia" source="subcategoria" />
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            < EstatusTextComponent />
                            <TextField label="Estatus actual" source="estatus" />
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <EstatusCambioTextComponent />
                            <SelectInput label="Estatus" source="estatus"  choices={[
                                { id: 'Abierto', name: 'Abierto' },
                                { id: 'En proceso', name: 'En proceso' },
                                { id: 'Cerrado', name: 'Cerrado' },
                            ]} />
                        </div>
                    </div>
                </div>  
                
            </FormTab>

            <FormTab label="Comentarios">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

            <div className="mt-2 mb-8 w-full">
                    < TicketTitle />
            </div>

            <div className="grid grid-cols-2 gap-4 px-2 w-full">
                <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <SimpleForm>
                        <ArrayField source="comentarios">
                            <Datagrid>
                                <TextField source="comentarios" label="Comentarios" />
                                <DateField source="fecha" label="Fecha" />
                            </Datagrid>
                        </ArrayField>
                    </SimpleForm>
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <ArrayInput source="comentarios">
                        <SimpleFormIterator>
                            <TextInput source="comentarios" label="Nuevo Comentario" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>

            </div>
            </div> 
  
            </FormTab>

            
            <FormTab label="Finalizar ticket">
                <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-neutral-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

                <div className="mt-2 mb-8 w-full">
                        < TicketTitle />
                </div>

                <div className="grid grid-cols-1 gap-4 px-2 w-full">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <TextField source="resolucion" />
                        <TextInput source="resolucion" className="full-width-input" multiline rows={5}/>
                    </div>
                </div>
                </div>  
            </FormTab>

       </TabbedForm>
      </Edit>
    );
};