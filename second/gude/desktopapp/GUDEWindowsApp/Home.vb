Public Class Home

    Private Sub btnTaskTimeline_Click(sender As Object, e As EventArgs) Handles btnTaskTimeline.Click
        Timeline.Show()
        Me.Hide()
    End Sub

    Private Sub btnLogout_Click(sender As Object, e As EventArgs) Handles btnLogout.Click
        Me.Hide()
        Welcome.Show()
    End Sub


    Private Sub clstboxTasks_SelectedIndexChanged(sender As Object, e As EventArgs) Handles clstboxTasks.SelectedIndexChanged
        lblTaskAmount.Text = clstboxTasks.CheckedItems.Count & " / " & clstboxTasks.Items.Count & " tasks completed..."

        If clstboxTasks.CheckedItems.Count = clstboxTasks.Items.Count Then
            btnSend.Enabled = True
            btnSend.BackColor = Color.DarkSeaGreen
            btnSend.ForeColor = Color.White
            btnSend.Cursor = Cursors.Hand
        Else
            btnSend.Enabled = False
            btnSend.BackColor = Color.Gainsboro
            btnSend.ForeColor = Color.Silver
            btnSend.Cursor = Cursors.Default
        End If

    End Sub

    Private Sub Home_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        lblTaskAmount.Text = clstboxTasks.CheckedItems.Count & " / " & clstboxTasks.Items.Count & " tasks completed..."
    End Sub

    Private Sub LogoutToolStripMenuItem1_Click(sender As Object, e As EventArgs) Handles LogoutToolStripMenuItem1.Click
        Me.Hide()
        Welcome.Show()
    End Sub

    Private Sub btnReceipt_Click(sender As Object, e As EventArgs) Handles btnReceipt.Click
        Me.Hide()
        Receipt.Show()
    End Sub

    Private Sub btnSend_Click(sender As Object, e As EventArgs) Handles btnSend.Click
        Me.Hide()
        Thankyou.Show()
    End Sub

End Class