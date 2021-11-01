import { Backdrop, CssBaseline, Fade, makeStyles, Modal } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
const Popup = ({
  isOpen,
  handleClose,
  children,
  className,
  isIconClose,
  title,
}) => {

    const useStyles = makeStyles((theme) => {
        return {
          mainModal: {
            overflow: 'auto',
            display: "flex",
            "& .modal-container": {
              background: 'rgba(var(--f23,255,255,255),1)',
              color: '#262626',
              padding: "22px 0 55px",
              width: "fit-content",
              margin: "auto",
              borderRadius: "12px",
              maxHeight: '100%',
              outline: 'none',
              "@media (max-width: 767px)": {
                width: "335px",
                paddingTop: "13px",
              },
      
              "& .body-modal-container": {
                padding: "0 118px",
                "@media (max-width: 767px)": {
                  padding: "0 20px",
                },
              },
              
      
              "& .icon-close": {
                textAlign: "right",
                fontSize: "30px",
                cursor: "pointer",
                marginRight: "12px",
                marginTop: '-12px',
                
                "@media (max-width: 767px)": {
                  marginRight: "13px",
                },
              },
              "& .icon-close::before": {
                color: '#000',
              },
              "& .modal-header": {
                  display: 'flex',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  borderBottom: '1px solid #B9B9BF'
              },
              "& .modal-header-title": {
                fontSize: '16px',
                textOverflow: 'ellipsis',
                wordWrap: 'nowrap',
                margin: '-5px 5px 10px 5px',
                width: '100%',
                fontWeight: 600
              }
            },
          }
        };
      });
    console.log("isIconClose: ", isIconClose)
  const classes = useStyles();

  return (
    <Modal
      className={`${classes.mainModal} ${className}`}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="modal-container">
            <div className="modal-header">
                <div className="modal-header-title">{title}</div>
          {isIconClose ? (
            <div className="icon-close"><CloseIcon style={{fontSize: '30px'}} onClick={handleClose}/></div>
          ) : (
             <></>
          )}
        </div>
          <div className="body-modal-container">{children}</div>
        </div>
      </Fade>
    </Modal>
  );
};

export default Popup;
