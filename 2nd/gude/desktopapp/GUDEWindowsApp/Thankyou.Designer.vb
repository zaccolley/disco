<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Thankyou
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
        Me.lblOutroDesc = New System.Windows.Forms.Label()
        Me.btnClose = New System.Windows.Forms.Button()
        Me.lblThankYou = New System.Windows.Forms.Label()
        Me.SuspendLayout()
        '
        'lblOutroDesc
        '
        Me.lblOutroDesc.Font = New System.Drawing.Font("Arial", 26.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblOutroDesc.ForeColor = System.Drawing.SystemColors.ControlDarkDark
        Me.lblOutroDesc.Location = New System.Drawing.Point(51, 167)
        Me.lblOutroDesc.Name = "lblOutroDesc"
        Me.lblOutroDesc.Size = New System.Drawing.Size(786, 215)
        Me.lblOutroDesc.TabIndex = 38
        Me.lblOutroDesc.Text = "Great, your report has been sent to us and will be assessed by us and we'll get b" & _
    "ack to your within two weeks with payment." & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & Global.Microsoft.VisualBasic.ChrW(13) & Global.Microsoft.VisualBasic.ChrW(10) & "Feel free to email us if you have " & _
    "any questions."
        '
        'btnClose
        '
        Me.btnClose.BackColor = System.Drawing.Color.Salmon
        Me.btnClose.Cursor = System.Windows.Forms.Cursors.Hand
        Me.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat
        Me.btnClose.Font = New System.Drawing.Font("Arial", 36.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnClose.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.btnClose.Location = New System.Drawing.Point(54, 419)
        Me.btnClose.Name = "btnClose"
        Me.btnClose.Size = New System.Drawing.Size(779, 108)
        Me.btnClose.TabIndex = 37
        Me.btnClose.Text = "Cool, close all this now"
        Me.btnClose.UseVisualStyleBackColor = False
        '
        'lblThankYou
        '
        Me.lblThankYou.AutoSize = True
        Me.lblThankYou.Font = New System.Drawing.Font("Arial", 48.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblThankYou.ForeColor = System.Drawing.SystemColors.ControlDarkDark
        Me.lblThankYou.Location = New System.Drawing.Point(45, 55)
        Me.lblThankYou.Name = "lblThankYou"
        Me.lblThankYou.Size = New System.Drawing.Size(664, 75)
        Me.lblThankYou.TabIndex = 36
        Me.lblThankYou.Text = "All done! Thanks. :¬)"
        '
        'Thankyou
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(884, 562)
        Me.Controls.Add(Me.lblOutroDesc)
        Me.Controls.Add(Me.btnClose)
        Me.Controls.Add(Me.lblThankYou)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog
        Me.MaximizeBox = False
        Me.MaximumSize = New System.Drawing.Size(900, 600)
        Me.MinimumSize = New System.Drawing.Size(900, 600)
        Me.Name = "Thankyou"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Thank You  - Mystery Shopping App"
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents lblOutroDesc As System.Windows.Forms.Label
    Friend WithEvents btnClose As System.Windows.Forms.Button
    Friend WithEvents lblThankYou As System.Windows.Forms.Label
End Class
