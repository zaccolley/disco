package pipesrus;

/**
 *
 * @author Zac Colley
 */
import java.util.ArrayList;

public class App {
    
    public static void main(String[] args) {
        ArrayList<Order> orders = new ArrayList();
        
        Gui gui = new Gui(orders);
        gui.setVisible(true);
    }    
    
}