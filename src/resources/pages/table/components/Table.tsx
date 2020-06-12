import React, { useCallback } from 'react';
import useUndo from '@/hooks/useUndo';
import TableConfigPane from './TableConfigPane';
import Index from '@/components/Footer';

const TableContainer = React.memo((props) => {
  const { config, onGenerate, history } = props;
  console.log(props);
  const {
    set: setConfig,
    reset: resetConfig,
    undo,
    redo,
    canUndo,
    canRedo,
    present,
  } = useUndo(config, 50);

  const handleChange = useCallback(
    (c) => {
      setConfig(c);
    },
    [setConfig]
  );

  const handleGenerate = useCallback(() => {
    onGenerate(present);
  }, [onGenerate, present]);

  return (
    <>
      {/*<div className="main chartshaper-table">*/}
      {/*  <TableConfigPane config={present} onChange={handleChange} />*/}
      {/*</div>*/}
      <Index
        {...props}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={redo}
        undo={undo}
        resetConfig={resetConfig}
        handleGenerate={handleGenerate}
        history={history}
      />
    </>
  );
});

export default TableContainer;
