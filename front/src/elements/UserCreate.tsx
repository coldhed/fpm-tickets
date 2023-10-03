import { Create, FormDataConsumer, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const UserCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="nombre_completo" label="Nombre Completo" />
                <TextInput source="correo" label="Correo" />
                <TextInput source="contrasena" label="Contraseña" />
                <SelectInput source="rol" label="Rol" defaultValue="ca" validate={required()} choices={[
                    { id: 'ca', name: 'Coordinador de Aula' },
                    { id: 'cn', name: 'Coordinador Nacional' },
                    { id: 'ce', name: 'Coordinador Ejecutivo' },
                ]} />
                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        return (
                            <TextInput source="coor_nac" label="Coordinador Nacional" disabled={formData.rol !== 'ca'} />
                        );
                    }}
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
}