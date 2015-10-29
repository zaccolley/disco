package pipesrus;

import java.awt.Dimension;
import java.awt.Toolkit;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.swing.DefaultListModel;
import javax.swing.JOptionPane;

public final class Gui extends javax.swing.JFrame {

    private ArrayList<Order> orders = new ArrayList();
    private final DefaultListModel orderListItems = new DefaultListModel();
    
    private int tempOrderPosition = -1;

    public Gui(ArrayList<Order> orders) {
        this.orders = orders;
        
        initComponents();
        centerWindows();
        
        updateItemList();
        orderList.setModel(orderListItems);
    }
    
    public void centerWindows(){
        // get different dimensions
        
        // screen size dimensions       
        Dimension s = Toolkit.getDefaultToolkit().getScreenSize();
     
        Dimension m = this.getSize(); // main window dimensions
        
        Dimension o = addOrder.getSize(); // order window dimensions
        
        // move the windows to the locations with context to each other
        
        this.setLocation(s.width / 2 - m.width / 2 - o.width / 2, s.height / 2 - m.height / 2);
        addOrder.setLocation(s.width / 2 - o.width / 2 + m.width / 2, s.height / 2 - o.height / 2);
    }
    
    public void updateItemList(){
        // reset the order
        orderListItems.removeAllElements();        
        
        int pipeAmount = 0;
        
        // if there are any orders
        if(orders.size() > 0){
            
            // loop through the orders
            for(Order o: orders){
                
                double orderItemCost = Math.floor((o.getCost() * o.getQuantity()) * 100) / 100;
                
                DecimalFormat formatter = new DecimalFormat("0.00");
                
                // add to the list the total cost and print out of the order
                orderListItems.addElement("<html><b>£" + formatter.format(orderItemCost) + "</b> " + o);
                
                pipeAmount += o.getQuantity();
            }
            
        }else{ // otherwise dispexlay a no order message
            orderListItems.addElement("<html><i>No orders yet, 'Add' one!</i>");
        }
        
        // update the label for the pipe amount
        itemAmountLabel.setText("Order amount: " + orders.size() + " ("+ pipeAmount +" pipes)");
        
        totalCost(orders);
    }
    
    public void totalCost(ArrayList<Order> orders){
        double totalCost = 0.0;
        
        for(Order o: orders){
            totalCost += o.getCost() * o.getQuantity();
        }
        
        // update the label for the total cost
        
        DecimalFormat formatter = new DecimalFormat("0.00");
        totalCostLabel.setText("Total: £" + formatter.format(totalCost)  + "\n");
    }
    
    // Auto generated GUI stuff
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        addOrder = new javax.swing.JDialog();
        sizeLabel = new javax.swing.JLabel();
        lengthLabel = new javax.swing.JLabel();
        diaLabel = new javax.swing.JLabel();
        gradeLabel = new javax.swing.JLabel();
        coloursLabel = new javax.swing.JLabel();
        quantityLabel = new javax.swing.JLabel();
        lengthTextField = new javax.swing.JTextField();
        diaTextField = new javax.swing.JTextField();
        gradeComboBox = new javax.swing.JComboBox();
        coloursComboBox = new javax.swing.JComboBox();
        seperator = new javax.swing.JSeparator();
        insulCheckBox = new javax.swing.JCheckBox();
        chemResCheckBox = new javax.swing.JCheckBox();
        reinforceCheckBox = new javax.swing.JCheckBox();
        quantitySpinner = new javax.swing.JSpinner();
        submitOrderButton = new javax.swing.JButton();
        discardOrderButton = new javax.swing.JButton();
        titleLabel = new javax.swing.JLabel();
        totalCostLabel = new javax.swing.JLabel();
        itemAmountLabel = new javax.swing.JLabel();
        addOrderButton = new javax.swing.JButton();
        editOrderButton = new javax.swing.JButton();
        deleteOrderButton = new javax.swing.JButton();
        orderScrollPane = new javax.swing.JScrollPane();
        orderList = new javax.swing.JList();
        submitOrdersButton = new javax.swing.JButton();
        resetOrdersButton = new javax.swing.JButton();

        addOrder.setMinimumSize(new java.awt.Dimension(373, 243));
        addOrder.setPreferredSize(new java.awt.Dimension(373, 243));
        addOrder.setResizable(false);

        sizeLabel.setText("Size:");

        lengthLabel.setFont(new java.awt.Font("Dialog", 0, 12));
        lengthLabel.setText("Length: (m)");

        diaLabel.setFont(new java.awt.Font("Dialog", 0, 12));
        diaLabel.setText("Diameter: (in)");

        gradeLabel.setFont(new java.awt.Font("Dialog", 0, 12));
        gradeLabel.setText("Grade:");

        coloursLabel.setFont(new java.awt.Font("Dialog", 0, 12));
        coloursLabel.setText("Colours:");

        quantityLabel.setText("Quantity:");

        lengthTextField.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        lengthTextField.setText("0.0");

        diaTextField.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        diaTextField.setText("0.0");

        gradeComboBox.setModel(new javax.swing.DefaultComboBoxModel(new String[] { "1", "2", "3", "4", "5" }));

        coloursComboBox.setModel(new javax.swing.DefaultComboBoxModel(new String[] { "0", "1", "2" }));

        seperator.setOrientation(javax.swing.SwingConstants.VERTICAL);

        insulCheckBox.setText("Insulation");

        chemResCheckBox.setText("Chemical Resistance");

        reinforceCheckBox.setText("Reinforcement");

        submitOrderButton.setText("Add");
        submitOrderButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                submitOrderButtonActionPerformed(evt);
            }
        });

        discardOrderButton.setText("Discard");
        discardOrderButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                discardOrderButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout addOrderLayout = new javax.swing.GroupLayout(addOrder.getContentPane());
        addOrder.getContentPane().setLayout(addOrderLayout);
        addOrderLayout.setHorizontalGroup(
            addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(addOrderLayout.createSequentialGroup()
                .addGap(10, 10, 10)
                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(addOrderLayout.createSequentialGroup()
                        .addGap(266, 266, 266)
                        .addComponent(quantitySpinner, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(addOrderLayout.createSequentialGroup()
                        .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(diaLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(lengthLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(gradeLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(coloursLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(lengthTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(diaTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(coloursComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(gradeComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addComponent(sizeLabel))
                        .addGap(18, 18, 18)
                        .addComponent(seperator, javax.swing.GroupLayout.PREFERRED_SIZE, 15, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addGap(5, 5, 5)
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(quantityLabel)
                                    .addComponent(reinforceCheckBox)
                                    .addComponent(chemResCheckBox)
                                    .addComponent(insulCheckBox)))
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(submitOrderButton)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(discardOrderButton)))))
                .addContainerGap())
        );
        addOrderLayout.setVerticalGroup(
            addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(addOrderLayout.createSequentialGroup()
                .addGap(10, 10, 10)
                .addComponent(sizeLabel)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(addOrderLayout.createSequentialGroup()
                        .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(lengthTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 27, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(lengthLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 23, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(diaTextField, javax.swing.GroupLayout.DEFAULT_SIZE, 25, Short.MAX_VALUE)
                                    .addComponent(diaLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addComponent(insulCheckBox)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(reinforceCheckBox)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(chemResCheckBox)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(gradeLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 24, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(gradeComboBox))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(coloursLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 24, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(coloursComboBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGap(6, 6, 6))
                            .addGroup(addOrderLayout.createSequentialGroup()
                                .addGap(6, 6, 6)
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(quantityLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(quantitySpinner, javax.swing.GroupLayout.PREFERRED_SIZE, 24, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addGroup(addOrderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(submitOrderButton)
                                    .addComponent(discardOrderButton)))))
                    .addComponent(seperator, javax.swing.GroupLayout.PREFERRED_SIZE, 147, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Pipes R Us");
        setBackground(new java.awt.Color(-723724,true));
        setResizable(false);

        titleLabel.setFont(new java.awt.Font("Serif", 2, 14));
        titleLabel.setText("Pipes 'R' Us");
        titleLabel.setToolTipText("For all your pipe needs!");

        totalCostLabel.setText("Total Cost: £##.##");

        itemAmountLabel.setText("Amount of items: #");

        addOrderButton.setText("Add");
        addOrderButton.setToolTipText("Add a pipe order");
        addOrderButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addOrderButtonActionPerformed(evt);
            }
        });

        editOrderButton.setText("Edit");
        editOrderButton.setToolTipText("Edit a pipe order");
        editOrderButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                editOrderButtonActionPerformed(evt);
            }
        });

        deleteOrderButton.setText("Delete");
        deleteOrderButton.setToolTipText("Delete a pipe order");
        deleteOrderButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                deleteOrderButtonActionPerformed(evt);
            }
        });

        orderList.setBackground(new java.awt.Color(-723724,true));
        orderList.setFont(new java.awt.Font("SansSerif", 0, 12));
        orderList.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        orderList.setOpaque(false);
        orderScrollPane.setViewportView(orderList);

        submitOrdersButton.setText("Submit");
        submitOrdersButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                submitOrdersButtonActionPerformed(evt);
            }
        });

        resetOrdersButton.setText("Reset");
        resetOrdersButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                resetOrdersButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(10, 10, 10)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(orderScrollPane)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(titleLabel)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(addOrderButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(editOrderButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(deleteOrderButton))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(totalCostLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 257, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 49, Short.MAX_VALUE)
                        .addComponent(itemAmountLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 246, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(submitOrdersButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(resetOrdersButton)))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(addOrderButton)
                    .addComponent(deleteOrderButton)
                    .addComponent(titleLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(editOrderButton))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(orderScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 123, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(7, 7, 7)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(itemAmountLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(totalCostLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 23, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(submitOrdersButton)
                    .addComponent(resetOrdersButton))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

private void addOrderButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addOrderButtonActionPerformed
    // when pressing add, reset form, show the order window
    tempOrderPosition = orders.size();
    resetAddOrder();
    addOrder.setVisible(true);
    
    // show discard button and change the submit button to 'Add'
    discardOrderButton.setVisible(true);
    submitOrderButton.setText("Add");
}//GEN-LAST:event_addOrderButtonActionPerformed

    public void resetAddOrder(){
        // for resetting the order form
        
        lengthTextField.setText("0.0");
        diaTextField.setText("0.0");

        chemResCheckBox.setSelected(false);
        insulCheckBox.setSelected(false);
        reinforceCheckBox.setSelected(false);

        quantitySpinner.setValue(0);

        gradeComboBox.setSelectedIndex(0);
        coloursComboBox.setSelectedIndex(0);      
    }
    
    public void setAddOrder(Order order){
        // for resetting the order form
        
        Pipe pipe = order.getPipe();
        
        lengthTextField.setText(String.valueOf(pipe.getLength()));
        diaTextField.setText(String.valueOf(pipe.getDia()));

        chemResCheckBox.setSelected(pipe.getChemRes());
        insulCheckBox.setSelected(pipe.getInsul());
        reinforceCheckBox.setSelected(pipe.getReinforce());

        quantitySpinner.setValue(order.getQuantity());
        
        gradeComboBox.setSelectedIndex(pipe.getGrade() - 1);
        coloursComboBox.setSelectedIndex(pipe.getColours());
    }

    private void resetOrdersButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_resetOrdersButtonActionPerformed
        int option = JOptionPane.showConfirmDialog(null,
                "Are you sure you want to reset orders?",
                "Woah, woah now!",
                JOptionPane.YES_NO_OPTION);
        if(option == 0){ // if picked yes reset orders and update
            orders = new ArrayList();
            updateItemList();
        }       
    }//GEN-LAST:event_resetOrdersButtonActionPerformed
    
    private void deleteOrderButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_deleteOrderButtonActionPerformed
        // if there are any orders
        if(orders.size() > 0){            
            
            try{
            
                int i = orderList.getSelectedIndex();

                int option = JOptionPane.showConfirmDialog(null,
                        "Are you sure you want to delete this order?",
                        "Woah, woah now!",
                        JOptionPane.YES_NO_OPTION);
                if(option == 0){ // if picked yes reset orders and update
                    orders.remove(i);
                    updateItemList();
                }
                
            }catch(ArrayIndexOutOfBoundsException e){
                displayModal("No item selected!", e + "\n\nOops... you didn't select an item!", "error");
            }
            
        }else{ // display a warning
            displayModal("Erm..", "There's nothing to delete?", "warn");
        }
    }//GEN-LAST:event_deleteOrderButtonActionPerformed
    
    private void discardOrderButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_discardOrderButtonActionPerformed
        int option = JOptionPane.showConfirmDialog(null,
                "Are you sure you want to discard these entries?",
                "It's all bad!",
                JOptionPane.YES_NO_OPTION);
        if(option == 0){
            resetAddOrder();
        }
    }//GEN-LAST:event_discardOrderButtonActionPerformed

    private void submitOrderButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_submitOrderButtonActionPerformed
        
        boolean exception = false; // whether or not there has been an exception
        
        int tempQuantity = 0;
        
        try{
            // set the temp value to that of the quality spinner
            tempQuantity = (Integer) quantitySpinner.getValue();
        }catch(NumberFormatException e){ // for all non numeric chars
            displayModal("Numbers only!", "\nOops... \"" + quantitySpinner.getValue() + "\" isn't right!"
                                        + "\nMake sure you're only inputting numbers!", "error");
            exception = true;
        }
    
        double tempLength = 0.0;
        
        try{
            // set the temp value to that of the length text field
            tempLength = Double.parseDouble(lengthTextField.getText());
        }catch(NumberFormatException e){ // for all non numeric chars
            displayModal("Numbers only!", "\nOops... \"" + lengthTextField.getText() + "\" isn't right!"
                                        + "\nMake sure you're only inputting numbers!", "error");
            exception = true;
        }
        
        double tempDia = 0.0;
        
        try{
            // set the temp value to that of the diameter field
            tempDia = Double.parseDouble((String) diaTextField.getText());
        }catch(NumberFormatException e){ // for all non numeric chars
            displayModal("Numbers only!", "\nOops... \"" + diaTextField.getText() + "\" isn't right!"
                                        + "\nMake sure you're only inputting numbers!", "error");
            exception = true;
        }

        // set the rest of the temp values to their respective form values
        int tempGrade = Integer.parseInt((String) gradeComboBox.getSelectedItem());
        int tempColours = Integer.parseInt((String) coloursComboBox.getSelectedItem());

        boolean tempInsul = insulCheckBox.isSelected();
        boolean tempChemRes = chemResCheckBox.isSelected();
        boolean tempReinforce = reinforceCheckBox.isSelected();
        
        // if there hasn't been an exception and all values validate correctly
        if(!exception && validateForm(tempQuantity, tempLength, tempDia, tempGrade, tempColours)){        
        
            // type 5
            if(tempGrade >= 3 && tempGrade <= 5 && tempColours == 2 && tempInsul && tempReinforce){
                PipeType5 pipe = new PipeType5(tempGrade, tempLength, tempDia, tempChemRes, tempInsul, tempReinforce, tempColours);
                addOrder(pipe, tempQuantity);
            }
            // type 4
            else if(tempGrade >= 2 && tempGrade <= 5 && tempColours == 2 && tempInsul && !tempReinforce){
                PipeType4 pipe = new PipeType4(tempGrade, tempLength, tempDia, tempChemRes, tempInsul, tempColours);
                addOrder(pipe, tempQuantity);
            }
            // type 3
            else if(tempGrade >= 2 && tempGrade <= 5 && tempColours == 2 && !tempInsul && !tempReinforce){
                PipeType23 pipe = new PipeType23(tempGrade, tempLength, tempDia, tempChemRes, tempColours);
                addOrder(pipe, tempQuantity);
            }
            // type 2
            else if(tempGrade >= 2 && tempGrade <= 4 && tempColours == 1 && !tempInsul && !tempReinforce){
                PipeType23 pipe = new PipeType23(tempGrade, tempLength, tempDia, tempChemRes, tempColours);
                addOrder(pipe, tempQuantity);
            }
            // type 1
            else if(tempGrade >= 1 && tempGrade <= 3 && tempColours == 0 && !tempInsul && !tempReinforce){
                PipeType1 pipe = new PipeType1(tempGrade, tempLength, tempDia, tempChemRes);
                addOrder(pipe, tempQuantity);
            }else{
                // the pipe couldn't be made
                displayModal("Aww...", "We don't supply this pipe sorry!", "error");
            }
        
        }
       
    }//GEN-LAST:event_submitOrderButtonActionPerformed

    public void displayModal(String title, String body, String type){
        int option = -1;

        if("error".equals(type)){ option = 0; }
        else if("info".equals(type)){ option = 1; }
        else if("warn".equals(type)){ option = 2; }
        else if("query".equals(type)){ option = 3; }

        JOptionPane.showMessageDialog(null, body, title, option);
    }

    public boolean validateForm(int quantity, double length, double dia, int grade, int colours){

        // the grade must be between 1 and 5
        if(grade < 1  || grade > 5){            
            displayModal("Wrong grade!", "Oops... \"" + grade + "\" isn't right!"
                                       + "\nMake sure the grade is 1 to 5!", "error");
            return false;
        }

        // the length must be between 0.0254 and 6.0
        if(length <= 0.0254 || length > 6.0){
            displayModal("Wrong length!", "Oops... \"" + length + "\" isn't right!"
                                       + "\nMake sure the length is 0.0254 to 6.0!", "warn");
            return false;
        }

        // the diameter must be between 2.0 and 40.0
        if(dia < 2.0 || dia > 40.0){
            displayModal("Wrong diameter!", "Oops... \"" + dia + "\" isn't right!"
                                          + "\nMake sure the diameter is 2.0 to 40.0!", "warn");
            return false;
        }

        if(colours < 0 || colours > 2){
            displayModal("Wrong colours!", "Oops... \"" + colours + "\" isn't right!"
                                         + "\nMake sure the colours is 0 to 2!", "error");
            return false;
        }

        if(quantity <= 0 || quantity > 200){
            displayModal("Wrong quantity!", "Oops... \"" + quantity + "\" isn't right!"
                                         + "\nMake sure quantity is 0 to 200!", "error");
            return false;
        }

        return true;
    }

    public void addOrder(Pipe pipe, int quantity){

        // create a new order and date for this change
        Date dateTime = new Date();
        Order order = new Order(pipe, quantity, dateTime);

        // if the order is being edited then we need to remove it first
        if(tempOrderPosition != orders.size()){
            orders.remove(tempOrderPosition);
        }
        orders.add(tempOrderPosition, order);

        // update list
        updateItemList();

        // reset

        addOrder.setVisible(false);
        resetAddOrder();
    }
            
            
    private void submitOrdersButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_submitOrdersButtonActionPerformed
        int option = JOptionPane.showConfirmDialog(null,
                "Are you sure you want to submit these orders?",
                "Right, ok...",
                JOptionPane.YES_NO_OPTION);
        if(option == 0){
            this.setVisible(false);
            JOptionPane.showMessageDialog(null, "Your order will now be processed!");
        }       
    }//GEN-LAST:event_submitOrdersButtonActionPerformed
    
    private void editOrderButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_editOrderButtonActionPerformed
        // if there are any orders
        if(orders.size() > 0){
            
            try{
                
                tempOrderPosition = orderList.getSelectedIndex();
                // get the order that has been selected and update the form
                setAddOrder(orders.get(tempOrderPosition));
                
                // show discard button and change the submit button to 'Add'
                submitOrderButton.setText("Edit");
                discardOrderButton.setVisible(false);
                
                // set the order window the visible
                addOrder.setVisible(true);                
                
            }catch(ArrayIndexOutOfBoundsException e){
                // this catch is for if nothing is selected, results in -1
                displayModal("No item selected!", e + "\n\nOops... you didn't select an item!", "error");
            }
            
        }else{ // display a warning
            displayModal("Erm..", "There's nothing to edit?", "warn");
        }
    }//GEN-LAST:event_editOrderButtonActionPerformed

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JDialog addOrder;
    private javax.swing.JButton addOrderButton;
    private javax.swing.JCheckBox chemResCheckBox;
    private javax.swing.JComboBox coloursComboBox;
    private javax.swing.JLabel coloursLabel;
    private javax.swing.JButton deleteOrderButton;
    private javax.swing.JLabel diaLabel;
    private javax.swing.JTextField diaTextField;
    private javax.swing.JButton discardOrderButton;
    private javax.swing.JButton editOrderButton;
    private javax.swing.JComboBox gradeComboBox;
    private javax.swing.JLabel gradeLabel;
    private javax.swing.JCheckBox insulCheckBox;
    private javax.swing.JLabel itemAmountLabel;
    private javax.swing.JLabel lengthLabel;
    private javax.swing.JTextField lengthTextField;
    private javax.swing.JList orderList;
    private javax.swing.JScrollPane orderScrollPane;
    private javax.swing.JLabel quantityLabel;
    private javax.swing.JSpinner quantitySpinner;
    private javax.swing.JCheckBox reinforceCheckBox;
    private javax.swing.JButton resetOrdersButton;
    private javax.swing.JSeparator seperator;
    private javax.swing.JLabel sizeLabel;
    private javax.swing.JButton submitOrderButton;
    private javax.swing.JButton submitOrdersButton;
    private javax.swing.JLabel titleLabel;
    private javax.swing.JLabel totalCostLabel;
    // End of variables declaration//GEN-END:variables
}
