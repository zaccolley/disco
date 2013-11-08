package pipesrus;

import java.util.ArrayList;
import java.lang.Math;

public class App {
    
    public static void main(String[] args) {
        ArrayList<Order> orders = new ArrayList();
        
        Gui gui = new Gui(orders);
        gui.setVisible(true);
        
        // Type 1: Grade 1 - 3. Colours = 0. Insul = 0. Reinforce = 0.
        // Type 2: Grade 2 - 4. Colours = 1. Insul = 0. Reinforce = 0.
        // Type 3: Grade 2 - 5. Colours = 2. Insul = 0. Reinforce = 0.
        // Type 4: Grade 2 - 5. Colours = 2. Insul = 1. Reinforce = 0.
        // Type 5: Grade 2 - 5. Colours = 2. Insul = 1. Reinforce = 1.
    }
    
    
}