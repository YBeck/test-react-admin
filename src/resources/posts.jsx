import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  ReferenceField,
  ReferenceManyField,
  DateField,
  EditButton,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SelectInput,
  Filter,
  TopToolbar,
  ListButton,
  ShowButton,
  Toolbar,
  SaveButton,
  DeleteButton,
  EditController,
  translate,
} from 'react-admin';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { uiActions } from '../state/actions';
import classnames from 'classnames';
import {
  Typography,
  withStyles,
  createStyles,
  Drawer,
  makeStyles,
} from '@material-ui/core';
import PostIcon from '@material-ui/icons/Book';
import { Route } from 'react-router';
import { push } from 'react-router-redux';
import { UserList } from './users';
const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
    },
    list: {
      flexGrow: 1,
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    listWithDrawer: {
      marginRight: 400,
    },
  });

const toolbarStyles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const asideStyles = makeStyles(theme => ({
  paper: {
    zIndex: 0,
    maxWidth: 395,
  },
}));

const CustomToolbar = withStyles(toolbarStyles)(props => (
  <Toolbar {...props}>
    <SaveButton />
    <DeleteButton undoable={false} />
  </Toolbar>
));

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const PostFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    <ReferenceInput label='User' source='userId' reference='users' allowEmpty>
      <SelectInput optionText='name' />
    </ReferenceInput>
  </Filter>
);

const EditActions = ({
  basePath,
  className,
  data,
  hasList,
  hasShow,
  resource,
}) => {
  return (
    <TopToolbar className={className}>
      {hasList && <ListButton basePath={basePath} />}
      {hasShow && <ShowButton basePath={basePath} record={data} />}
      <button>test</button>
    </TopToolbar>
  );
};

const Aside = ({ record }) => (
  <div style={{ width: 200, margin: '1em' }}>
    <Typography variant='title'>Post details</Typography>
    <Typography variant='body1'>
      Posts will only be published once an editor approves them
    </Typography>
  </div>
);

const rowClick = (id, basePath, record) => {
  return `/posts/${id}/expand`;
};

const PostListView = ({
  classes,
  reduxActions,
  sidebarCase,
  ...otherProps
}) => {
  const props = getResourceProps(otherProps); 
  const asideClasses = asideStyles();
  return (
    <div className={classes.root}>
      <Route path='/posts/:postId/expand' exact>
        {({ match, ...rest }) => {
          const isMatch = !!match && match.path === '/posts/:postId/expand';
          if (isMatch) {
            reduxActions.updateSidebar(match.params.id);
          } else {
            reduxActions.updateSidebar(null);
          }
          // console.log("REST: ", rest);
          // console.log("PROPS: ", props);
          return (
            <>
              <List
                {...props}
                filters={<PostFilter />}
                className={classnames(classes.list, {
                  [classes.listWithDrawer]: isMatch,
                })}
                exporter={false}
              >
                <Datagrid /* expand={<PostPanel /> }*/ rowClick={rowClick}>
                  <TextField source='id' />
                  {/* <ReferenceField
                    source='userId'
                    reference='users'
                    basePath={props.basePath}
                  >
                    <TextField source='name' />
                  </ReferenceField> */}
                  <TextField source='title' />
                  <EditButton />
                </Datagrid>
              </List>
              <Drawer
                variant='persistent'
                open={isMatch}
                anchor='right'
                classes={{
                  paper: asideClasses.paper,
                }}
                // onClose={() => {
                //   console.log('CLOSING');
                //   // reduxActions.updateSidebar(null);
                // }}
              >
                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                {isMatch ? (
                  <PostEdit id={match.params.postId} {...props} />
                ) : null}
              </Drawer>
            </>
          );
        }}
      </Route>
    </div>
  );
};

const mapStateToProps = state => {
  const { ui: { sidebarCase } = {} } = state;
  return {
    sidebarCase,
  };
};

const mapDispatchToProps = dispatch => ({
  reduxActions: {
    ...bindActionCreators(uiActions, dispatch),
  },
});

export const PostList = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // translate,
  withStyles(styles),
// )(() => <strong>HELLO</strong>)
)(PostListView);

export const PostEdit =  _props => {
  const id = decodeURIComponent(_props.match.params.id);
  const props = { id, ...getResourceProps(_props) };
  return (
    <EditController {...props}>
      {controllerProps =>
        controllerProps.record ? (
          <div style={{ marginTop: 80 }}>
            <SimpleForm
              basePath={controllerProps.basePath}
              record={controllerProps.record}
              save={controllerProps.save}
              version={controllerProps.version}
              redirect='list'
              resource='reviews'
              toolbar={<CustomToolbar />}
            >
              <TextInput source='id' disabled />
              <ReferenceInput source='userId' reference='users'>
                <SelectInput optionText='name' />
              </ReferenceInput>
              <TextInput source='title' />
              <TextInput source='body' fullWidth />
            </SimpleForm>
            <SimpleForm
              basePath='/users'
              link='edit'
              record={controllerProps.record}
              save={controllerProps.save}
              version={controllerProps.version}
              redirect='list'
              resource='reviews'
              toolbar={<CustomToolbar />}
            >
              <ReferenceManyField
                label='Users'
                reference='users'
                target='userId'
              >
                <Datagrid>
                  <TextField source='id' />
                  <TextField source='name' />
                  <TextField source='username' />
                  <EditButton />
                </Datagrid>
              </ReferenceManyField>
            </SimpleForm>
          </div>
        ) : null
      }
    </EditController>
  );
};
// export const PostEdit = props => (
//   <Edit
//     title={<PostTitle />}
//     {...props}
//     actions={<EditActions {...props} />}
//     toolbar={<CustomToolbar />}
//   >
//     <SimpleForm>
//       <TextInput source="id" disabled/>
//       <ReferenceInput source="userId" reference="users">
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <TextInput source="title" />
//       <TextInput source="body" fullWidth/>
//       <ReferenceManyField
//         label="Comments"
//         reference="comments"
//         target="post_id"
//       >
//         <Datagrid>
//           <TextField source="body" />
//           <DateField source="created_at" />
//           <EditButton />
//         </Datagrid>
//       </ReferenceManyField>
//     </SimpleForm>
//   </Edit>
// );

export const PostCreate = ({ staticContext, ..._props }) => {
  const props = getResourceProps(_props);
  console.log({ props });
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source='userId' reference='users'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <TextInput source='title' />
        <TextInput source='body' fullWidth />
      </SimpleForm>
    </Create>
  );
};

export const postResource = {
  name: 'posts',
  list: PostList,
  create: PostCreate,
  edit: PostEdit,
  icon: PostIcon,
  options: { label: 'Posts' },
};

export const commentsResource = {
  name: 'comments',
};

function getResourceProps(props) {
  const basePath = props.match.url;
  const resource = {
    resource: 'posts',
    options: postResource.options,
    hasList: true,
    hasEdit: !!postResource.edit,
    hasShow: !!postResource.show,
    hasCreate: !!postResource.create,
  };
  return { ...props, basePath, ...resource };
}
