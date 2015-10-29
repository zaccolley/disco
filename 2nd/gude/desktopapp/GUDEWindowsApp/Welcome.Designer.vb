<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Welcome
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
        Me.lblIntroWelcome = New System.Windows.Forms.Label()
        Me.lblIDS = New System.Windows.Forms.Label()
        Me.lblShopperID = New System.Windows.Forms.Label()
        Me.lblAssignmentID = New System.Windows.Forms.Label()
        Me.TextBox2 = New System.Windows.Forms.TextBox()
        Me.btnLogin = New System.Windows.Forms.Button()
        Me.ShapeContainer1 = New Microsoft.VisualBasic.PowerPacks.ShapeContainer()
        Me.LineShape1 = New Microsoft.VisualBasic.PowerPacks.LineShape()
        Me.DirectorySearcher1 = New System.DirectoryServices.DirectorySearcher()
        Me.lblIntroDesc = New System.Windows.Forms.Label()
        Me.TextBox1 = New System.Windows.Forms.TextBox()
        Me.SuspendLayout()
        '
        'lblIntroWelcome
        '
        Me.lblIntroWelcome.AutoSize = True
        Me.lblIntroWelcome.Font = New System.Drawing.Font("Arial", 48.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblIntroWelcome.ForeColor = System.Drawing.SystemColors.ControlDarkDark
        Me.lblIntroWelcome.Location = New System.Drawing.Point(58, 31)
        Me.lblIntroWelcome.Name = "lblIntroWelcome"
        Me.lblIntroWelcome.Size = New System.Drawing.Size(742, 75)
        Me.lblIntroWelcome.TabIndex = 27
        Me.lblIntroWelcome.Text = "Hello, Mystery Shopper"
        '
        'lblIDS
        '
        Me.lblIDS.AutoSize = True
        Me.lblIDS.Font = New System.Drawing.Font("Arial", 27.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblIDS.Location = New System.Drawing.Point(431, 173)
        Me.lblIDS.Name = "lblIDS"
        Me.lblIDS.Size = New System.Drawing.Size(90, 44)
        Me.lblIDS.TabIndex = 28
        Me.lblIDS.Text = "IDs:"
        '
        'lblShopperID
        '
        Me.lblShopperID.AutoSize = True
        Me.lblShopperID.Font = New System.Drawing.Font("Arial", 14.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblShopperID.Location = New System.Drawing.Point(436, 252)
        Me.lblShopperID.Name = "lblShopperID"
        Me.lblShopperID.Size = New System.Drawing.Size(83, 22)
        Me.lblShopperID.TabIndex = 30
        Me.lblShopperID.Text = "Shopper"
        '
        'lblAssignmentID
        '
        Me.lblAssignmentID.AutoSize = True
        Me.lblAssignmentID.Font = New System.Drawing.Font("Arial", 14.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblAssignmentID.Location = New System.Drawing.Point(653, 252)
        Me.lblAssignmentID.Name = "lblAssignmentID"
        Me.lblAssignmentID.Size = New System.Drawing.Size(110, 22)
        Me.lblAssignmentID.TabIndex = 32
        Me.lblAssignmentID.Text = "Assignment"
        '
        'TextBox2
        '
        Me.TextBox2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.TextBox2.Font = New System.Drawing.Font("Arial", 21.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TextBox2.ForeColor = System.Drawing.SystemColors.ScrollBar
        Me.TextBox2.Location = New System.Drawing.Point(656, 279)
        Me.TextBox2.Name = "TextBox2"
        Me.TextBox2.Size = New System.Drawing.Size(190, 41)
        Me.TextBox2.TabIndex = 31
        Me.TextBox2.Text = "DB5"
        '
        'btnLogin
        '
        Me.btnLogin.BackColor = System.Drawing.Color.DarkSeaGreen
        Me.btnLogin.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnLogin.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnLogin.Font = New System.Drawing.Font("Arial", 36.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnLogin.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.btnLogin.Location = New System.Drawing.Point(439, 351)
        Me.btnLogin.Name = "btnLogin"
        Me.btnLogin.Size = New System.Drawing.Size(407, 108)
        Me.btnLogin.TabIndex = 33
        Me.btnLogin.Text = "Ok, log me in"
        Me.btnLogin.UseVisualStyleBackColor = False
        '
        'ShapeContainer1
        '
        Me.ShapeContainer1.Location = New System.Drawing.Point(0, 0)
        Me.ShapeContainer1.Margin = New System.Windows.Forms.Padding(0)
        Me.ShapeContainer1.Name = "ShapeContainer1"
        Me.ShapeContainer1.Shapes.AddRange(New Microsoft.VisualBasic.PowerPacks.Shape() {Me.LineShape1})
        Me.ShapeContainer1.Size = New System.Drawing.Size(884, 562)
        Me.ShapeContainer1.TabIndex = 34
        Me.ShapeContainer1.TabStop = False
        '
        'LineShape1
        '
        Me.LineShape1.BorderColor = System.Drawing.SystemColors.Control
        Me.LineShape1.BorderWidth = 3
        Me.LineShape1.Name = "LineShape1"
        Me.LineShape1.X1 = 404
        Me.LineShape1.X2 = 404
        Me.LineShape1.Y1 = 177
        Me.LineShape1.Y2 = 462
        '
        'DirectorySearcher1
        '
        Me.DirectorySearcher1.ClientTimeout = System.TimeSpan.Parse("-00:00:01")
        Me.DirectorySearcher1.ServerPageTimeLimit = System.TimeSpan.Parse("-00:00:01")
        Me.DirectorySearcher1.ServerTimeLimit = System.TimeSpan.Parse("-00:00:01")
        '
        'lblIntroDesc
        '
        Me.lblIntroDesc.Font = New System.Drawing.Font("Arial", 26.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblIntroDesc.ForeColor = System.Drawing.SystemColors.ControlDarkDark
        Me.lblIntroDesc.Location = New System.Drawing.Point(60, 177)
        Me.lblIntroDesc.Name = "lblIntroDesc"
        Me.lblIntroDesc.Size = New System.Drawing.Size(321, 282)
        Me.lblIntroDesc.TabIndex = 35
        Me.lblIntroDesc.Text = "Now that you have sleuthed around in the shop time to polish up the report and se" & _
    "nd it off to us."
        '
        'TextBox1
        '
        Me.TextBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.TextBox1.Font = New System.Drawing.Font("Arial", 21.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.TextBox1.ForeColor = System.Drawing.SystemColors.ScrollBar
        Me.TextBox1.Location = New System.Drawing.Point(439, 279)
        Me.TextBox1.Name = "TextBox1"
        Me.TextBox1.Size = New System.Drawing.Size(190, 41)
        Me.TextBox1.TabIndex = 29
        Me.TextBox1.Text = "007"
        '
        'Welcome
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.BackColor = System.Drawing.Color.White
        Me.ClientSize = New System.Drawing.Size(884, 562)
        Me.Controls.Add(Me.lblIntroDesc)
        Me.Controls.Add(Me.btnLogin)
        Me.Controls.Add(Me.lblAssignmentID)
        Me.Controls.Add(Me.TextBox2)
        Me.Controls.Add(Me.lblShopperID)
        Me.Controls.Add(Me.TextBox1)
        Me.Controls.Add(Me.lblIDS)
        Me.Controls.Add(Me.lblIntroWelcome)
        Me.Controls.Add(Me.ShapeContainer1)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog
        Me.MaximizeBox = False
        Me.MaximumSize = New System.Drawing.Size(900, 600)
        Me.MinimumSize = New System.Drawing.Size(900, 600)
        Me.Name = "Welcome"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Welcome - Mystery Shopping App"
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents lblIntroWelcome As System.Windows.Forms.Label
    Friend WithEvents lblIDS As System.Windows.Forms.Label
    Friend WithEvents lblShopperID As System.Windows.Forms.Label
    Friend WithEvents lblAssignmentID As System.Windows.Forms.Label
    Friend WithEvents TextBox2 As System.Windows.Forms.TextBox
    Friend WithEvents btnLogin As System.Windows.Forms.Button
    Friend WithEvents ShapeContainer1 As Microsoft.VisualBasic.PowerPacks.ShapeContainer
    Friend WithEvents LineShape1 As Microsoft.VisualBasic.PowerPacks.LineShape
    Friend WithEvents DirectorySearcher1 As System.DirectoryServices.DirectorySearcher
    Friend WithEvents lblIntroDesc As System.Windows.Forms.Label
    Friend WithEvents TextBox1 As System.Windows.Forms.TextBox
End Class
