package pipesrus;

import java.util.ArrayList;

public class App {
    
    public static void main(String[] args) {
        ArrayList<Order> orders = new ArrayList();        
        initGui(orders);
    }
    
    public static void initGui(ArrayList<Order> orders){
        String title = "Pipes 'R' Us";
        
        Gui gui = new Gui(orders);
        gui.setVisible(true);
        gui.setTitle(title);
    }
    
}