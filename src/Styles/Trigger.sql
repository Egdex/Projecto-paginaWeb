SET SERVEROUTPUT ON
CREATE OR REPLACE TRIGGER trg_act_comisiones
AFTER UPDATE OR INSERT OR DELETE ON VENTA_TICKETS
FOR EACH ROW
BEGIN
    IF (inserting) THEN
        INSERT INTO COM_VENTA_TICKET
        VALUES(:NEW.nro_ticket, (:NEW.monto_ticket*0.1));
    ELSIF (updating) THEN
        IF (:NEW.monto_ticket > :old.monto_ticket) THEN
            UPDATE COM_VENTA_TICKET
            SET valor_comision = ROUND(:NEW.monto_ticket*0.1, 2)
            WHERE nro_ticket = :NEW.nro_ticket;
        END IF;
    ELSIF (deleting) THEN
        DELETE FROM COM_VENTA_TICKET
        WHERE nro_ticket = :OLD.nro_ticket;
    END IF;
END trg_act_comisiones;
/