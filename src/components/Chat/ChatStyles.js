import { makeStyles } from '@material-ui/core/styles';

export const useChatStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
  },
  smContainer: {
    height: '100vh',
  },
  lgContainer: {
    textAlign: 'center',
    margin: '5vh auto',
    height: '90vh',
  },
}))

export const useSidebarStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  sidebarTop: {
    backgroundColor: '#00ACFF',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    borderRight: '1px solid #d3d3d3'
  },
  sidebarTopRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '10vw',
  },
  icons: {
    color: '#fff',
    fontSize: '24px',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    height: '45px',
    padding: '10px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '30px',
    borderRadius: '7px',
  },
  list: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden"
  },
  modal: {
    position: 'absolute',
    width: 300,
    maxHeight: 1000, 
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const useSidebarChatsStyles = makeStyles((theme) => ({
  chatInfo: {
    display: 'inline-block',
    textAlign: 'left', 
    marginLeft: '2vh',
  },
}))

export const useChatComponentStyles = makeStyles((theme) => ({
  chatTop: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #d3d3d3',
    backgroundColor: '#fffaf0',
  },
  chatTopInfo: {
    flex: '1',
    paddingLeft: '20px',
    marginLeft: '10px',
    textAlign: 'left',
  },
  chatTimestamp: {
    fontSize: 'xx-small',
  },
  chatFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #d3d3d3',
    marginBottom: '1px',
  },
  form: {
    flex: '1',
    display: 'flex',
  },
  input: {
    flex: '1',
    borderRadius: '10px',
    border: 'none',
    outlineWidth: '0',
  },
}))