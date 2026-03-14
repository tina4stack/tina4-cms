program Tina4CMS;

uses
  System.StartUpCopy,
  FMX.Forms,
  uTina4CMS in 'uTina4CMS.pas' {frmTina4CMS};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TfrmTina4CMS, frmTina4CMS);
  Application.Run;
end.
