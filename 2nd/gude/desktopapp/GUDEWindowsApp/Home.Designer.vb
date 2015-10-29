<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Home
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.lblTitle = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.btnLogout = New System.Windows.Forms.Button()
        Me.btnSettings = New System.Windows.Forms.Button()
        Me.MenuStrip1 = New System.Windows.Forms.MenuStrip()
        Me.FileToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.LogoutToolStripMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.LogoutToolStripMenuItem1 = New System.Windows.Forms.ToolStripMenuItem()
        Me.headerLine = New Microsoft.VisualBasic.PowerPacks.LineShape()
        Me.ShapeContainer1 = New Microsoft.VisualBasic.PowerPacks.ShapeContainer()
        Me.btnTaskTimeline = New System.Windows.Forms.Button()
        Me.btnReceipt = New System.Windows.Forms.Button()
        Me.btnSend = New System.Windows.Forms.Button()
        Me.lblWelcome = New System.Windows.Forms.Label()
        Me.lblInstruction = New System.Windows.Forms.Label()
        Me.clstboxTasks = New System.Windows.Forms.CheckedListBox()
        Me.lblTaskAmount = New System.Windows.Forms.Label()
        Me.LineShape1 = New Microsoft.VisualBasic.PowerPacks.LineShape()
        Me.Panel1.SuspendLayout()
        Me.MenuStrip1.SuspendLayout()
        Me.SuspendLayout()
        '
        'lblTitle
        '
        Me.lblTitle.AccessibleRole = System.Windows.Forms.AccessibleRole.None
        Me.lblTitle.AutoSize = True
        Me.lblTitle.Font = New System.Drawing.Font("Arial", 21.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblTitle.ForeColor = System.Drawing.Color.Black
        Me.lblTitle.Location = New System.Drawing.Point(12, 15)
        Me.lblTitle.Name = "lblTitle"
        Me.lblTitle.Size = New System.Drawing.Size(93, 33)
        Me.lblTitle.TabIndex = 2
        Me.lblTitle.Text = "Home"
        '
        'Panel1
        '
        Me.Panel1.Controls.Add(Me.btnLogout)
        Me.Panel1.Controls.Add(Me.btnSettings)
        Me.Panel1.Controls.Add(Me.lblTitle)
        Me.Panel1.Cursor = System.Windows.Forms.Cursors.Default
        Me.Panel1.ForeColor = System.Drawing.SystemColors.ControlLight
        Me.Panel1.Location = New System.Drawing.Point(0, 27)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(884, 68)
        Me.Panel1.TabIndex = 7
        '
        'btnLogout
        '
        Me.btnLogout.BackColor = System.Drawing.Color.Salmon
        Me.btnLogout.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnLogout.FlatAppearance.BorderSize = 0
        Me.btnLogout.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnLogout.Font = New System.Drawing.Font("Arial", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnLogout.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.btnLogout.Location = New System.Drawing.Point(741, 13)
        Me.btnLogout.Name = "btnLogout"
        Me.btnLogout.Size = New System.Drawing.Size(131, 45)
        Me.btnLogout.TabIndex = 15
        Me.btnLogout.Text = "Logout"
        Me.btnLogout.UseVisualStyleBackColor = False
        '
        'btnSettings
        '
        Me.btnSettings.BackColor = System.Drawing.Color.LightSkyBlue
        Me.btnSettings.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnSettings.FlatAppearance.BorderSize = 0
        Me.btnSettings.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnSettings.Font = New System.Drawing.Font("Arial", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnSettings.ForeColor = System.Drawing.Color.FromArgb(CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer))
        Me.btnSettings.Location = New System.Drawing.Point(591, 13)
        Me.btnSettings.Name = "btnSettings"
        Me.btnSettings.Size = New System.Drawing.Size(131, 45)
        Me.btnSettings.TabIndex = 14
        Me.btnSettings.Text = "Settings"
        Me.btnSettings.UseVisualStyleBackColor = False
        '
        'MenuStrip1
        '
        Me.MenuStrip1.Items.AddRange(New System.Windows.Forms.ToolStripItem() {Me.FileToolStripMenuItem, Me.LogoutToolStripMenuItem, Me.LogoutToolStripMenuItem1})
        Me.MenuStrip1.Location = New System.Drawing.Point(0, 0)
        Me.MenuStrip1.Name = "MenuStrip1"
        Me.MenuStrip1.Size = New System.Drawing.Size(884, 24)
        Me.MenuStrip1.TabIndex = 11
        Me.MenuStrip1.Text = "MenuStrip1"
        '
        'FileToolStripMenuItem
        '
        Me.FileToolStripMenuItem.Name = "FileToolStripMenuItem"
        Me.FileToolStripMenuItem.Size = New System.Drawing.Size(52, 20)
        Me.FileToolStripMenuItem.Text = "Home"
        '
        'LogoutToolStripMenuItem
        '
        Me.LogoutToolStripMenuItem.Name = "LogoutToolStripMenuItem"
        Me.LogoutToolStripMenuItem.Size = New System.Drawing.Size(61, 20)
        Me.LogoutToolStripMenuItem.Text = "Settings"
        '
        'LogoutToolStripMenuItem1
        '
        Me.LogoutToolStripMenuItem1.Name = "LogoutToolStripMenuItem1"
        Me.LogoutToolStripMenuItem1.Size = New System.Drawing.Size(57, 20)
        Me.LogoutToolStripMenuItem1.Text = "Logout"
        '
        'headerLine
        '
        Me.headerLine.BorderColor = System.Drawing.Color.Silver
        Me.headerLine.Name = "headerLine"
        Me.headerLine.X1 = 0
        Me.headerLine.X2 = 884
        Me.headerLine.Y1 = 105
        Me.headerLine.Y2 = 105
        '
        'ShapeContainer1
        '
        Me.ShapeContainer1.Location = New System.Drawing.Point(0, 0)
        Me.ShapeContainer1.Margin = New System.Windows.Forms.Padding(0)
        Me.ShapeContainer1.Name = "ShapeContainer1"
        Me.ShapeContainer1.Shapes.AddRange(New Microsoft.VisualBasic.PowerPacks.Shape() {Me.LineShape1, Me.headerLine})
        Me.ShapeContainer1.Size = New System.Drawing.Size(884, 562)
        Me.ShapeContainer1.TabIndex = 12
        Me.ShapeContainer1.TabStop = False
        '
        'btnTaskTimeline
        '
        Me.btnTaskTimeline.BackColor = System.Drawing.Color.LightSkyBlue
        Me.btnTaskTimeline.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnTaskTimeline.FlatAppearance.BorderSize = 0
        Me.btnTaskTimeline.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnTaskTimeline.Font = New System.Drawing.Font("Arial", 27.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnTaskTimeline.ForeColor = System.Drawing.Color.FromArgb(CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer))
        Me.btnTaskTimeline.Location = New System.Drawing.Point(591, 128)
        Me.btnTaskTimeline.Name = "btnTaskTimeline"
        Me.btnTaskTimeline.Size = New System.Drawing.Size(281, 118)
        Me.btnTaskTimeline.TabIndex = 13
        Me.btnTaskTimeline.Text = "Tasks"
        Me.btnTaskTimeline.UseVisualStyleBackColor = False
        '
        'btnReceipt
        '
        Me.btnReceipt.BackColor = System.Drawing.Color.LightSkyBlue
        Me.btnReceipt.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnReceipt.FlatAppearance.BorderSize = 0
        Me.btnReceipt.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnReceipt.Font = New System.Drawing.Font("Arial", 26.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnReceipt.ForeColor = System.Drawing.Color.FromArgb(CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer))
        Me.btnReceipt.Location = New System.Drawing.Point(591, 274)
        Me.btnReceipt.Name = "btnReceipt"
        Me.btnReceipt.Size = New System.Drawing.Size(281, 118)
        Me.btnReceipt.TabIndex = 14
        Me.btnReceipt.Text = "Receipt"
        Me.btnReceipt.UseVisualStyleBackColor = False
        '
        'btnSend
        '
        Me.btnSend.BackColor = System.Drawing.Color.Gainsboro
        Me.btnSend.Cursor = System.Windows.Forms.Cursors.Default
        Me.btnSend.Enabled = False
        Me.btnSend.FlatAppearance.BorderSize = 0
        Me.btnSend.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnSend.Font = New System.Drawing.Font("Arial", 27.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnSend.ForeColor = System.Drawing.Color.Silver
        Me.btnSend.Location = New System.Drawing.Point(591, 420)
        Me.btnSend.Name = "btnSend"
        Me.btnSend.Size = New System.Drawing.Size(281, 118)
        Me.btnSend.TabIndex = 15
        Me.btnSend.Text = "Send"
        Me.btnSend.UseVisualStyleBackColor = False
        '
        'lblWelcome
        '
        Me.lblWelcome.AutoSize = True
        Me.lblWelcome.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblWelcome.Location = New System.Drawing.Point(18, 128)
        Me.lblWelcome.Name = "lblWelcome"
        Me.lblWelcome.Size = New System.Drawing.Size(162, 24)
        Me.lblWelcome.TabIndex = 16
        Me.lblWelcome.Text = "Hey there, James."
        '
        'lblInstruction
        '
        Me.lblInstruction.AutoSize = True
        Me.lblInstruction.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblInstruction.Location = New System.Drawing.Point(18, 168)
        Me.lblInstruction.Name = "lblInstruction"
        Me.lblInstruction.Size = New System.Drawing.Size(461, 20)
        Me.lblInstruction.TabIndex = 17
        Me.lblInstruction.Text = "Before you can send us your report you need to do the following:"
        '
        'clstboxTasks
        '
        Me.clstboxTasks.Anchor = System.Windows.Forms.AnchorStyles.Left
        Me.clstboxTasks.BorderStyle = System.Windows.Forms.BorderStyle.None
        Me.clstboxTasks.CheckOnClick = True
        Me.clstboxTasks.Cursor = System.Windows.Forms.Cursors.Hand
        Me.clstboxTasks.Font = New System.Drawing.Font("Arial", 18.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.clstboxTasks.ForeColor = System.Drawing.Color.Black
        Me.clstboxTasks.FormattingEnabled = True
        Me.clstboxTasks.Items.AddRange(New Object() {"Add detail to task 1", "Check your details in settings", "Verify and amend receipt information"})
        Me.clstboxTasks.Location = New System.Drawing.Point(46, 208)
        Me.clstboxTasks.Name = "clstboxTasks"
        Me.clstboxTasks.Size = New System.Drawing.Size(502, 300)
        Me.clstboxTasks.TabIndex = 18
        '
        'lblTaskAmount
        '
        Me.lblTaskAmount.AutoSize = True
        Me.lblTaskAmount.Font = New System.Drawing.Font("Arial", 12.0!, System.Drawing.FontStyle.Italic, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblTaskAmount.Location = New System.Drawing.Point(389, 131)
        Me.lblTaskAmount.Name = "lblTaskAmount"
        Me.lblTaskAmount.Size = New System.Drawing.Size(159, 19)
        Me.lblTaskAmount.TabIndex = 19
        Me.lblTaskAmount.Text = "0 / 0 tasks completed"
        '
        'LineShape1
        '
        Me.LineShape1.BorderColor = System.Drawing.SystemColors.Control
        Me.LineShape1.BorderWidth = 3
        Me.LineShape1.Name = "LineShape1"
        Me.LineShape1.X1 = 571
        Me.LineShape1.X2 = 571
        Me.LineShape1.Y1 = 130
        Me.LineShape1.Y2 = 532
        '
        'Home
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.White
        Me.ClientSize = New System.Drawing.Size(884, 562)
        Me.Controls.Add(Me.lblTaskAmount)
        Me.Controls.Add(Me.clstboxTasks)
        Me.Controls.Add(Me.lblInstruction)
        Me.Controls.Add(Me.lblWelcome)
        Me.Controls.Add(Me.btnSend)
        Me.Controls.Add(Me.btnReceipt)
        Me.Controls.Add(Me.btnTaskTimeline)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.MenuStrip1)
        Me.Controls.Add(Me.ShapeContainer1)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog
        Me.MaximizeBox = False
        Me.MaximumSize = New System.Drawing.Size(900, 600)
        Me.MinimumSize = New System.Drawing.Size(900, 600)
        Me.Name = "Home"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Home - Mystery Shopping App"
        Me.Panel1.ResumeLayout(False)
        Me.Panel1.PerformLayout()
        Me.MenuStrip1.ResumeLayout(False)
        Me.MenuStrip1.PerformLayout()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents lblTitle As System.Windows.Forms.Label
    Friend WithEvents Panel1 As System.Windows.Forms.Panel
    Friend WithEvents MenuStrip1 As System.Windows.Forms.MenuStrip
    Friend WithEvents FileToolStripMenuItem As System.Windows.Forms.ToolStripMenuItem
    Friend WithEvents LogoutToolStripMenuItem As System.Windows.Forms.ToolStripMenuItem
    Friend WithEvents headerLine As Microsoft.VisualBasic.PowerPacks.LineShape
    Friend WithEvents ShapeContainer1 As Microsoft.VisualBasic.PowerPacks.ShapeContainer
    Friend WithEvents btnTaskTimeline As System.Windows.Forms.Button
    Friend WithEvents btnLogout As System.Windows.Forms.Button
    Friend WithEvents btnSettings As System.Windows.Forms.Button
    Friend WithEvents btnReceipt As System.Windows.Forms.Button
    Friend WithEvents btnSend As System.Windows.Forms.Button
    Friend WithEvents lblWelcome As System.Windows.Forms.Label
    Friend WithEvents lblInstruction As System.Windows.Forms.Label
    Friend WithEvents clstboxTasks As System.Windows.Forms.CheckedListBox
    Friend WithEvents lblTaskAmount As System.Windows.Forms.Label
    Friend WithEvents LogoutToolStripMenuItem1 As System.Windows.Forms.ToolStripMenuItem
    Friend WithEvents LineShape1 As Microsoft.VisualBasic.PowerPacks.LineShape
End Class
