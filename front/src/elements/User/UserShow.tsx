import { DeleteButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext } from 'react-admin';

const UserShowActions = () => {
    return (
        <TopToolbar>
            <DeleteButton />
        </TopToolbar>
    );
}

const PostTitle = () => {
    const record = useRecordContext();

    // the record can be empty while loading

    if (!record) return null;
    return <span>{record.nombre_completo}</span>;
};

export const UserShow = () => (
    <Show actions={<UserShowActions />} title={<PostTitle />}>
        <SimpleShowLayout >
            <TextField source="nombre_completo" />
            <TextField source="correo" />
            <TextField source="rol" />
        </SimpleShowLayout>
    </Show>
);